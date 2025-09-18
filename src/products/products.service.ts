import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepo } from './products.repo';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class ProductsService{

    constructor(
        private productsRepo: ProductsRepo,
        @Inject( CACHE_MANAGER ) private cacheManager: Cache
    ){}

    async getAll(){

        if( process.env.enableCache == 'true' ){

            const cacheKey = 'all_products';
            const cached = await this.cacheManager.get(cacheKey);

            if( cached ){

                //console.log( 'Retornó un caché' );
                
                return cached; // 👈 devuelve desde caché
            }
        }

        return this.productsRepo.getAll();
    }

    async getProduct( id:any ){

        if( process.env.enableCache == 'true' ){

            const cacheKey = `product_${id}`;
            const cached = await this.cacheManager.get(cacheKey);

            if( cached ){

                //console.log( 'Retornó un caché' );

                return cached;
            }
        }

        return this.productsRepo.getProduct( id );
    }

    async clearCache(){

        return this.productsRepo.clearCache();
    }

}