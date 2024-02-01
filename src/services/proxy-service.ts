import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Request, Response } from 'express';
import { RequestDto } from "src/models/dots/request-dto";
import { RequestService } from "./resquest-service";
import { RequestEntity } from "src/models/entities/resquest-entity";
import { log } from "console";
import { ConfigService } from "@nestjs/config";
//import { log } from 'console';
//import { catchError, firstValueFrom, lastValueFrom, map } from 'rxjs';
//import { RequestDto } from './models/dtos/request-dto';
//import { ResponseDto } from './models/dto/response-dto';
//import { ResponseEntity } from './models/entities/response-entity';

const http = require('http');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

@Injectable()
export class ProxyService {

    private logger = new Logger('ProxyService');

    private externalHost: string;
    private externalUrl: URL;

    /**
     * 
     * @param httpService 
     */
    constructor(
        private readonly configService: ConfigService,
        private readonly requestService: RequestService,
        //private readonly httpService: HttpService,
    ) { 
        if(!configService){
            this.logger.error("App Config Service: NOT FOUND!");
            this.setTarget(null);
        } else {
            const HELLO_MSG = configService.get<string>('HELLO_MSG') || "ENV NOT FOUND";
            this.logger.verbose("AppModule configService HELLO_MSG: " + HELLO_MSG);
            //
            const urlTarget = configService.get<string>('URL_TERGET');
            if(!urlTarget){
                this.logger.error("URL_TERGET NOT FOUND!");
                this.setTarget(null);
            } else {
                //this.setTarget('http://localhost:3000');
                this.setTarget(urlTarget);
            }
        }
    }

    /**
     * 
     * @returns 
     */
    getTarget() {
        return this.externalHost;
    }

    /**
     * 
     * @param targetHost 
     */
    setTarget(targetHost: string) {
        this.logger.verbose('--- Proxy Target Host: ' + targetHost);
        this.externalHost = targetHost;
        this.externalUrl = new URL(targetHost);
    }

    /**
     * 
     * @returns 
     */
    getTargetURL(): URL{
        return this.externalUrl;
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async forward(req: Request, res: Response) {
        console.log("------ ProxyService :: forward =>REQUEST FORWRD for URL: " + req.url);
        this.logger.verbose("ProxyService :: forward =>REQUEST FORWRD for URL: " + req.url);
        if(!this.getTarget()){
            this.logger.error("URL TARGET NOT FOUND!");
            return;
        }
        if( !this.externalHost || !this.externalHost ){
            this.logger.error("ProxyService :: forward => Error externalHost config");
            res.status(500).send('PROXY FORWARD CONFIG ERROR').end();
            return;
        }
        // CREATE request url
        const requestUrl = new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
        console.log('Request URL: ', requestUrl);
        // CHECK PRFOTOCOL
        if( requestUrl.protocol.toLowerCase() != 'http:'){
            this.logger.error("ProxyService :: forward => error http protocol request");
            res.status(500).send('HTTP PROTOCOL Request ERROR').end();
            return;
        }
        // CREATE forward url
        console.log('TargetURL:', this.getTargetURL());
        const forewardUrl = new URL(this.getTargetURL().origin + req.originalUrl);
        console.log('Foreward URL: ', forewardUrl);
        // CREATE dto
        let requestDto: RequestDto = new RequestDto();
        requestDto.requestUrl = requestUrl.href;
        requestDto.forwardUrl = forewardUrl.href;
        requestDto.method = req.method;
        requestDto.path = requestUrl.pathname;
        requestDto.searchParams = requestUrl.search;
        requestDto.protocol = requestUrl.protocol;
        requestDto.requestHeaders = JSON.stringify(req.headers);
        if( 
            requestDto.method 
            && req.body 
            && Object.keys(req.body).length != 0 
        ) {// && requestDto.method.toUpperCase() === 'POST'){
            let body = req.body;
            let bodyStr = body ? JSON.stringify(body) : null;
            console.log("BODY: ", body);
            requestDto.requestBody = bodyStr;
        }
        console.log("--- Forward Request DTO: ", requestDto);
        // CHECK request
        let requestEntity: RequestEntity = null;
        requestEntity = await this.requestService.findByMethodAndPathAndSearchParams(requestDto.method, requestDto.path, requestDto.searchParams);
        // if exist old response then send response data
        if( requestEntity ){
            console.log("------- Founded Forward Request Entity!");
            console.log("- Forward Request Entity: ", requestEntity);
            let statusCode: number = null;
            let response =  null;
            if(requestEntity){
                statusCode = requestEntity.statusCode;
                if(!statusCode){
                    statusCode = 500;
                }
                response = requestEntity.response;
                if(!response){
                    response = '';
                }
            }
            console.log('---- INIT response headers: ', res.getHeaders());
            let responseHeaders = JSON.parse(requestEntity.responseHeaders);
            console.log('---- responseHeaders: ', responseHeaders );
            if(responseHeaders){
                for (const [key, value] of Object.entries(responseHeaders)) {
                    console.log("KEY: " + key + " --> " + value);
                    res.setHeader(key.toString(), value.toString());
                }
            } 
            console.log('---- AFTER response headers: ', res.getHeaders());
            //res.writeHead(statusCode, responseHeaders);
            res.send(response).end();
        } else {
            // if not exist then create and execute http request forwarding
            console.log("------- Create New Forward Request Entity");
            // CREATE Entity
            requestEntity = await this.requestService.create(requestDto);
            if(!requestEntity){
                res.status(500).send('forward - Error create request entity').end();
                return;
            } else {
                await this.forwardRequest(req, res, async (forewardHeaders, responseStatusCode, responseHeaders, response, error) => {
                    console.log('- response status code: ', responseStatusCode);
                    console.log('- response headers: ', responseHeaders);
                    console.log('- response response: ', response);
                    //
                    requestEntity.statusCode = responseStatusCode;
                    requestEntity.forewardHeaders = JSON.stringify(forewardHeaders);
                    requestEntity.responseHeaders = JSON.stringify(responseHeaders);
                    requestEntity.response = response;
                    requestEntity.errors = JSON.stringify(error);
                    await this.requestService.update(requestEntity.id, requestEntity);
                });
            }
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param callback 
     */
    private async forwardRequest(req: Request, res: Response, callback){
        // HEADER CONFIG
        let headersConfig = []
        // BODY
        let body = req.body;
        let bodyStr = body ? JSON.stringify(body) : null;
        if (body && bodyStr) {
            console.log("--- SEND BODY: ", body);
            console.log("BODY STR: ", bodyStr);
            console.log("BODY LENGTH: ", bodyStr.length);
            // Change headers config
            headersConfig['content-type'] = 'application/json';
            headersConfig['content-length'] = bodyStr.length;
        }
        // CREATE FORWARD HEADERS 
        console.log('--- Headers');
        let forewardHeaders =  this.generateHeaders(req, headersConfig);
        console.log('- forewardHeaders', forewardHeaders);
        // CREATE FORWARD REQUEST OPTIONS
        let headerOptions = this.createForwardOptions(req, body, forewardHeaders);
        console.log("--- Forward Request Header Options: ", headerOptions);
        // FORWARD REQUEST
        let protocolRequest = http;
        const proxyReq = protocolRequest.request(headerOptions, async (proxyRes) => {
            let responseData = '';
            proxyRes.setEncoding('utf8');
            // Inoltra l'header di stato e gli header della risposta dal server di destinazione
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            // Gestisci i dati ricevuti durante la risposta
            proxyRes.on('data', (chunk) => {
                responseData += chunk;
            });
            // Quando la risposta dal server di destinazione è completata
            proxyRes.on('end', async () => {
                console.log('--- RESPONSE: ', responseData);
                // Chiudi la risposta al client
                res.end();
                //
                callback(
                    forewardHeaders, 
                    proxyRes.statusCode, 
                    proxyRes.headers, 
                    responseData, 
                    headerOptions, 
                    null
                );
            });
            // Inoltra il corpo della risposta dal server di destinazione
            proxyRes.pipe(res);
        });
        // Gestione degli errori della richiesta al server di destinazione
        proxyReq.on('error', (error) => {
            console.error('proxyReq - Errore nella richiesta al server di destinazione.', error);
            res.status(500).send('proxyReq - Errore nella richiesta al server di destinazione');
            callback(
                forewardHeaders, 
                500, 
                null, 
                headerOptions, 
                error
            );
        });
        // WRITE BODY
        if (body && bodyStr && bodyStr.length > 0) {
            console.log("--- WRITE SEND BODY: ", bodyStr);
            proxyReq.write(bodyStr);
        }
        proxyReq.end();
        // Inoltra il corpo della richiesta al server di destinazione
        req.pipe(proxyReq);
    }

    /**
     * 
     * @param req 
     * @returns 
     */
    generateHeaders(req: Request, headersConfig: any[]){
        console.log("- generateHeaders :: req.headers: ", req.headers);
        let headers = req.headers;
        delete headers['connection'];
        console.log('- generateHeaders :: headersConfig: ', headersConfig);
        console.log(' headersConfig.length: ',  headersConfig.length);
        if(headersConfig){
            Object.entries(headersConfig).map(([key, value]) => {
                console.log('generateHeaders :: header key "' + key + '" = "' + value + '"');
                headers[key] = value;
            });
        }
        headers['X-Forwarded-For'] = req.ip;
        return headers;
    }

    /**
     * 
     * @param req 
     * @param body 
     * @returns 
     */
    createForwardOptions(req: Request, body: any, forewardHeaders: any) {
        const options = {
            method: req.method,
            headers: forewardHeaders,
            protocol: this.getTargetURL().protocol,
            hostname: this.getTargetURL().hostname,
            port: this.getTargetURL().port,
            path: req.url,
            body: body,
            params: req.params,
            query: req.query,
        };
        return options;
    }

}