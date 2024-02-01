import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, mapFrom, Mapper, MappingProfile, mapWith } from "@automapper/core";
import { RequestEntity } from '../entities/resquest-entity';
import { RequestDto } from '../dots/request-dto'

@Injectable()
export class RequestMapper extends AutomapperProfile { 

    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper: Mapper) => {
            createMap(mapper, RequestEntity, RequestDto);
            createMap(mapper, RequestDto, RequestEntity);
        }
    }

}