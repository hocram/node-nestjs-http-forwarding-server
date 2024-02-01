import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ProxyService } from '../services/proxy-service';
import { ProxyAxiosService } from 'src/services/proxy-axios-service';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {

    private logger = new Logger('ProxyMiddleware');

    constructor(
        private readonly proxy: ProxyService
        //private readonly proxy: ProxyAxiosService
    ){}

    use(req: Request, res: Response, next: NextFunction) {
        console.log("\n--------- ProxyMiddleware :: REQUEST SERVICE for URL: " + req.url);
        this.logger.verbose("START REQUEST SERVICE for URL: " + req.url);
        try {
            this.proxy.forward(req, res);
        } catch (err) {
            this.logger.error("ERROR REQUEST for URL: " + req.url);
            res.status(500).send({ error: 'ERROR' }).end();
        }
        //next();
    }
}
