//import { All, Controller, Get, Header, Logger, Param, Query, Req, Res } from '@nestjs/common';
//import { IncomingMessage, ServerResponse } from 'http';
//import { HttpService } from '@nestjs/axios';
//import { Request, Response } from 'express';
import { All, Controller, Delete, Get, Logger, Param, Query, Req } from "@nestjs/common";
import { RequestEntity } from "src/models/entities/resquest-entity";
import { ProxyService } from "src/services/proxy-service";
import { RequestService } from "src/services/resquest-service";

@Controller('proxy')
export class ProxyController {

  private logger = new Logger('ProxyController');

  /**
   * 
   */
  constructor(
    //private readonly appService: AppService,
    //private readonly http: HttpService,
    private readonly requestService: RequestService,
    private readonly proxy: ProxyService
  ){}

  // req: IncomingMessage
  // req: Request
  //, @Res() res: ServerResponse) { //@Param() param, @Req() c_req: IncomingMessage, @Res() c_res: ServerResponse): any {
  /*
  @All('/proxy') // '*'
  @Header('Cache-Control', 'none')
  request( @Req() req: Request, @Query() query, @Param() param, @Res() res: Response) : any { 
    this.logger.verbose("REQUEST SERVICE for URL: " + req.url);
    try{
    //this.proxy.forward(req, res);
    }  catch (err) {
      res.status(500).send({ error: 'ERROR' });
    }
    res.send('hello').end();
  }
  */

  @Get()
  hello(){
    return 'PROXY API';
  }

  /**
   * 
   * @returns 
   */
  @Get('host')
  async hostTarget(): Promise<String> {
    return await this.proxy.getTarget();
  }

  /**
   * 
   * @returns 
   */
  /*
  @Get('host/url')
  async hostTargetURL(): Promise<string> {
    let targetHost = await this.proxy.getTarget();
    let url = new URL(targetHost);
    console.log("URL: ", JSON.parse(url.toString()));
    return url.toJSON(); 
  }
  */

  /**
   * 
   * @returns 
   */
  @Get('requests')
  async findAll(): Promise<any[]> {
    const requestEntitities: RequestEntity[] =  await this.requestService.findAll();
    let result: any[] = [];
    if(requestEntitities && requestEntitities.length > 0){
      requestEntitities.forEach( (requestEntitity) => { 
        result.push(this.convertRequestEntitytoObject(requestEntitity));
      });
    }
    return result;
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  @Get('requests/:id')
  async findById(@Param('id') id: number): Promise<any> {
    return this.convertRequestEntitytoObject(await this.requestService.findById(id));
  }

  /**
   * 
   * @param path 
   * @returns 
   */
  @Get('requests/path/:path')
  async findByPath(@Param('path') path: string): Promise<any[]> {
    this.logger.verbose('findByPath: ' + path);
    path = '/' + path;
    console.log('findByPath: search path: ', path);
    const requestEntitities: RequestEntity[] = await this.requestService.findByPath(path);
    let result: any[] = [];
    if(requestEntitities && requestEntitities.length > 0){
      requestEntitities.forEach( (requestEntitity) => { 
        result.push(this.convertRequestEntitytoObject(requestEntitity));
      });
    }
    return result;
  }

  /**
   * 
   * @param path 
   * @param queryObj 
   * @returns 
   */
  @All('requests/url/:path')
  async findByPathAndSearchParams(@Param('path') path: string, @Query() queryObj: any, @Req() request: Request): Promise<any> {
    this.logger.verbose('findByPathAndSearchParams: ' + path);
    const method = request.method;
    console.log('findByPathAndSearchParams: ', ' - path: ', path, ' - queryObj: ', queryObj);
    path = '/' + path;
    let  searchParams: string = null;
    const queryStr: string = this.convertObjectToQueryString(queryObj);
    if(queryStr){
      searchParams = '?' + queryStr;
    }
    console.log('findByPathAndSearchParams: search path and searchParams', ' - path: ', path, ' - searchParams: ', searchParams);
    const requestEntity: RequestEntity = await this.requestService.findByMethodAndPathAndSearchParams(method, path, searchParams);
    return this.convertRequestEntitytoObject(requestEntity);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  @Delete('requests/:id')
  async delete(@Param('id') id: number): Promise<RequestEntity> {
    return await this.requestService.delete(id);
  }

  /// UTILS //////////////////////////////

  /**
   * 
   * @param obj 
   * @returns 
   */
  private convertObjectToQueryString(obj: any): string {
    if(!obj){
      return null;
    }
    return Object.keys(obj)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&');
  }

  /**
   * 
   * @param data 
   * @returns 
   */
  private convertPossibleJsonToObject(data: any){
    if(!data){
      return null;
    }
    try {
      let dataJson = JSON.parse(data);
      return dataJson;
    } catch (error) {
      return data;
    }
  }

  /**
   * 
   * @param requestEntity 
   * @returns 
   */
  private convertRequestEntitytoObject(requestEntity: RequestEntity): any {
    if(!requestEntity){
      return null;
    }
    let entityObj: any = requestEntity;
    entityObj.requestHeaders = this.convertPossibleJsonToObject(entityObj.requestHeaders);
    entityObj.requestBody = this.convertPossibleJsonToObject(entityObj.requestBody);
    entityObj.forewardHeaders = this.convertPossibleJsonToObject(entityObj.forewardHeaders);
    entityObj.responseHeaders = this.convertPossibleJsonToObject(entityObj.responseHeaders);
    entityObj.response = this.convertPossibleJsonToObject(entityObj.response);
    return entityObj; 
  }

}