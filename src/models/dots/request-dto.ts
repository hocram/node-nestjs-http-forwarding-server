import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsNumber, IsString, isNumber } from "class-validator";

export class RequestDto {

    @AutoMap()
    id?: number;

    /// REQUEST /////////////////////////

    @AutoMap()
    //@IsNotEmpty()
    @IsString()
    requestUrl: string;

    @AutoMap()
    //@IsNotEmpty()
    @IsString()
    forwardUrl: string;

    @AutoMap()
    //@IsNotEmpty()
    @IsString()
    path: string;

    @AutoMap()
    @IsString()
    searchParams: string;

    @AutoMap()
    @IsString()
    method: string;

    @AutoMap()
    //@IsNotEmpty()
    @IsString()
    protocol: string;

    @AutoMap()
    //@IsNotEmpty()
    @IsString()
    requestHeaders: string;

    @AutoMap()
    @IsString()
    requestBody: string;

    @AutoMap()
    //@IsNotEmpty()
    @IsString()
    forewardHeaders: string;

    /// RESPONSE /////////////////////////

    @AutoMap()
    //@IsNotEmpty()
    @IsString()
    responseHeaders: string;

    @AutoMap()
    @IsNumber()
    statusCode: number;

    @AutoMap()
    response: any;

    @AutoMap()
    errors: any;

    /// DATA /////////////////////////

    @AutoMap()
    dateCreate: Date;

    @AutoMap()
    dateUpdate: Date;
    
}