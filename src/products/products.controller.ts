import { Controller, Delete, Get, Inject, Param, Post, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController{

    constructor(
        private productsService: ProductsService
    ){}

    @Get('')
    async getAll(){

        return await this.productsService.getAll();
    }

    @Get(':id')
    async getProduct( @Param() params: any ){

        return await this.productsService.getProduct( params.id );
    }

    @Delete('cache')
	async clearCache(){

		await this.productsService.clearCache();

		return {
			message: 'Caché eliminado',
			code: 200
		}

	}
}