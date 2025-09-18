import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepo } from './products.repo';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        CacheModule.register({
            isGlobal: false
        })
    ],
    providers: [ ProductsService, ProductsRepo ],
    controllers: [ ProductsController ]
})
export class ProductModule{}