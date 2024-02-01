import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";

import { RequestDto } from "src/models/dots/request-dto";
import { RequestEntity } from "src/models/entities/resquest-entity";
import { Repository } from "typeorm";

@Injectable()
export class RequestService {

    // LOG
    private readonly logger: Logger = new Logger('RequestService');

    // CONSTRUCTOR
    constructor(
        @InjectRepository(RequestEntity) private repository: Repository<RequestEntity>,
        @InjectMapper() private readonly mapper: Mapper
    ){}

    // FIND ALL
    async findAll(): Promise<RequestEntity[]> {
        const entities: RequestEntity[] = await this.repository.find({});
        if(!entities){
            return [];
        }
        return entities;
    }

    // FIND BY ID
    async findById(id: number): Promise<RequestEntity> {
        const entity: RequestEntity = await this.repository.findOne({ where: { id } });
        // if(!entity){
        //     throw new NotFoundException();
        // }
        return entity;
    }

    // FIND BY PATH
    async findByPath(path: string): Promise<RequestEntity[]> {
        const entities: RequestEntity[] = await this.repository.find({ where: { path }});
        // if(!entities){
        //     throw new NotFoundException();
        // }
        return entities;
    }

    // FIND BY PATH AND SEARCH_PARAMS
    async findByPathAndSearchParams(path: string, searchParams: string): Promise<RequestEntity[]> {
        const entities: RequestEntity[] = await this.repository.find({ where: { path, searchParams }});
        // if(!entities){
        //     throw new NotFoundException();
        // }
        return entities;
    }

    // FIND BY PATH AND SEARCH_PARAMS
    async findByMethodAndPathAndSearchParams(method: string, path: string, searchParams: string): Promise<RequestEntity> {
        const entity: RequestEntity = await this.repository.findOne({ where: { method, path, searchParams }});
        //if(!entity){
            //throw new NotFoundException();
        //}
        return entity;
    }
    
    // CREATE
    async create(dtoCreate: RequestDto): Promise<RequestEntity> {
        console.log("request create: ", dtoCreate);
        let entity: RequestEntity = null;
        try{
            const entityMaped: RequestEntity = this.mapper.map(dtoCreate, RequestDto, RequestEntity);
            if( entityMaped ){
                entity = await this.repository.save(entityMaped);
            } else {
                //new BadRequestException('Error Map Data');
                return null;
            }
        } catch(err){
            this.logger.error("error create: ", JSON.stringify(dtoCreate));
            this.logger.error(err);
            return null;
        }
        return entity;
    }
    
    // DELETE
    async delete(id: number): Promise<RequestEntity>{
        const entity: RequestEntity = await this.findById(id);
        // if(!entity){
        //     throw new NotFoundException();
        // }
        await this.repository.delete(id);
        return entity;
    }

    // UPDATE
    async update(id: number, data: RequestDto): Promise<any>{
        return await this.repository.update(id, data);
    }

    // PATCH
    async patch(id: number, data: RequestDto): Promise<any>{
        return await this.repository.update(id, data);
    }

}