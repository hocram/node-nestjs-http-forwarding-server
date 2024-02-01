import { Logger, MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { join } from 'path';
import * as path from 'path';
import { RequestService } from './services/resquest-service';
import { RequestEntity } from './models/entities/resquest-entity';
import { ProxyService } from './services/proxy-service';
import { ProxyMiddleware } from './middlewares/proxy-middleware';
import { ProxyController } from './controllers/proxy-controller';
import { RequestMapper } from './models/mappers/request-mapper';
import { ProxyAxiosService } from './services/proxy-axios-service';
import { ConfigModule } from '@nestjs/config';

import { configuration } from './config/configuration';

// LOGGER
const logger = new Logger('APP_MODULES');

const ENV = process.env.NODE_ENV || "dev";
const ENV_FILE_PATH = !ENV ? '.env' : `src/environments/${ENV}.env`;
logger.verbose("__dirname: " + __dirname);
logger.verbose("environment: " + ENV);
logger.verbose("environment file: " + ENV_FILE_PATH );

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //ignoreEnvFile: true,
      envFilePath: ENV_FILE_PATH,
      load: [configuration]
    }),
    // MODULE
    // HttpModule, // axios
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    //
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    //
    TypeOrmModule.forRoot({
      type: 'sqlite',
      autoLoadEntities: true,
      entities: [join(__dirname, '**', '*-entity.{js,ts}')],
      database: path.resolve(__dirname, '../db', 'db.sqlite'),
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      // ENTITY
      RequestEntity
    ]),
  ],
  controllers: [
    AppController,
    ProxyController
  ],
  providers: [
    AppService,
    // SERVICES
    ProxyService,
    //ProxyAxiosService,
    RequestService,
    // MAPPER
    RequestMapper
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ProxyMiddleware)
      .exclude(
        { path: '/proxy', method: RequestMethod.ALL },
        { path: '/proxy/(.*)', method: RequestMethod.ALL },
        //'/proxy/(.*)'
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
      //.forRoutes(ProxyController);
  }
}
