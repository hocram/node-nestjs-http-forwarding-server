import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom } from "rxjs";
import { Request, Response } from 'express';

@Injectable()
export class ProxyAxiosService {

    private logger = new Logger('ProxyAxiosService');

    private externalHost: string;
    private externalUrl: URL;

    /**
     * 
     * @param httpService 
     */
    constructor(
        private readonly httpService: HttpService
    ) {
        this.setTarget('http://localhost:3000');
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
        this.logger.verbose('---- CHAGE proxy target Host: ' + targetHost);
        this.externalHost = targetHost;
        this.externalUrl = new URL(targetHost);
    }

    /**
     * 
     * @returns 
     */
    getTargetURL(): URL {
        return this.externalUrl;
    }


    // https://axios-http.com/docs/req_config

    /**
     * 
     * @param req 
     * @param res 
     */
    async forward(req: Request, res: Response) {
        console.log("------ ProxyAxiosService :: forward =>REQUEST FORWRD for URL: " + req.url);
        this.logger.verbose("ProxyAxiosService :: forward =>REQUEST FORWRD for URL: " + req.url);
        // { data }
        const response = await firstValueFrom(
            this.httpService.request({
                baseURL : 'http://localhost:3000/',
                url : '/api',
                method: 'get',
                headers: req.headers,
                params: req.params
            })
            .pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error.response.data);
                    throw 'An error happened!';
                })
            )
        );
        //console.log('RESPONSE: ', response);
        console.log('RESPONSE.headers: ', response.headers);
        let headers = response.headers as Object
        //res.writeHead(response.status, headers);
        res.status(response.status).send('response: ' + response.data).end();
    }

    /**
    * 
    * @param req 
    * @param res 
    * @param callback 
    */
    private async forwardRequest(req: Request, res: Response, callback) {
    }


    /**
     * 
     * @param req 
     * @returns 
     */
    generateHeaders(req: Request, headersConfig: any[]) {
        console.log("- generateHeaders :: req.headers: ", req.headers);
        let headers = req.headers;
        //
        delete headers['connection'];
        console.log('- generateHeaders :: headersConfig: ', headersConfig);
        console.log(' headersConfig.length: ', headersConfig.length);
        if (headersConfig) {
            Object.entries(headersConfig).map(([key, value]) => {
                console.log('generateHeaders :: header key "' + key + '" = "' + value + '"');
                headers[key] = value;
            });
        }
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
            //params: req.params,
            //query: req.query,
        };
        return options;
    }

}