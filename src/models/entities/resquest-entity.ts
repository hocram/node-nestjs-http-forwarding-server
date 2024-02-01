import { AutoMap } from "@automapper/classes";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('request')
@Index('path_search_params_index', ["method", "path", "searchParams"], { unique: true })
export class RequestEntity {

    // ID
    @PrimaryGeneratedColumn()
    @AutoMap()
    id: number;

    /// REQUEST /////////////////////////

    // request_url
    @Column({
        name: 'request_url',
        type: 'varchar',
        length: 255,
        nullable: false,
        //unique: true
    })
    @AutoMap()
    requestUrl: string;

    // forward_url
    @Column({
        name: 'forward_url',
        type: 'varchar',
        length: 255,
        //nullable: false
    })
    @AutoMap()
    forwardUrl: string;

    // request path
    @Column({
        name: 'request_path',
        type: 'varchar',
        length: 255,
        nullable: false,
        //unique: true
    })
    //@Index('index_path')
    @AutoMap()
    path: string;

    // request search params
    @Column({
        name: 'request_search_params',
        type: 'varchar',
        length: 255
    })
    @AutoMap()
    searchParams: string;

    // METHOD
    @Column({
        name: 'method',
        type: 'varchar',
        length: 10,
        nullable: false
    })
    @AutoMap()
    method: string;

    // protocol
    @Column({
        name: 'protocol',
        type: 'varchar',
        length: 50,
        //nullable: false
    })
    @AutoMap()
    protocol: string;

    // request_headers
    @Column({
        name: 'request_headers',
        type: 'text',
        nullable: true
    })
    @AutoMap()
    requestHeaders: string;

     // body
     @Column({
        name: 'body',
        type: 'text',
        nullable: true
    })
    @AutoMap()
    requestBody: string;

    // foreward_headers
    @Column({
        name: 'foreward_headers',
        type: 'text',
        nullable: true
    })
    @AutoMap()
    forewardHeaders: string;

    /// RESPONSE /////////////////////////

    // headers
    @Column({
        name: 'reqsponse_headers',
        type: 'text',
        nullable: true
    })
    @AutoMap()
    responseHeaders: string;

    // STATUS CODE
    @Column({ 
        name: 'status_code',
        type: "int",
        //default: "-1",
        nullable: true
    })
    @AutoMap()
    statusCode: number;

    // response
    @Column({
        name: 'response',
        type: 'text',
        nullable: true
    })
    @AutoMap()
    response: string;

    // errors
    @Column({
        name: 'errors',
        type: 'text',
        nullable: true
    })
    @AutoMap()
    errors: string;

    /// DATA /////////////////////////

    // CREATION DATE
    @Column({ name: 'date_create' })
    @CreateDateColumn({})
    @AutoMap()
    dateCreate: Date;

    // CREATION DATE
    @Column({ name: 'date_updated' })
    @UpdateDateColumn({})
    @AutoMap()
    dateUpdate: Date;

}