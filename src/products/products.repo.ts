import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Injectable, Inject } from "@nestjs/common";
import axios from "axios";
import type { Cache } from "cache-manager";
import { Product } from "src/models/product";

@Injectable()
export class ProductsRepo {

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    private baseUrl = process.env.baseUrl || '';
    private consumerKey = process.env.consumerKey || '';
    private consumerSecret = process.env.consumerSecret || '';
    private cacheTime = Number( process.env.cacheTime ) || 6000;

    async getAll() {

        const cacheKey = `all_products`;

        const res = await axios.get(`${this.baseUrl}/products?per_page=10`, {
            auth: {
                username: this.consumerKey,
                password: this.consumerSecret
            },
        });

        const products = res.data;

        if (process.env.enableCache == 'true') {

            // Guarda en caché, TTL en segundos
            await this.cacheManager.set(cacheKey, this.productFields(products), this.cacheTime );
        }

        return this.productFields(products);
    }

    async getProduct(id: any) {

        const cacheKey = `product_${id}`;

        try {

            const res = await axios.get(`${this.baseUrl}/products/${id}`, {
                auth: {
                    username: this.consumerKey,
                    password: this.consumerSecret
                },
            });

            const product = res.data;

            if( process.env.enableCache == 'true' ) {

                // Guarda en caché, TTL en segundos
                await this.cacheManager.set(cacheKey, this.productFields(product), this.cacheTime );
            }

            //return this.productFields( res.data );
            return this.productFields(product);

        } catch (error) {

            console.error('Error en getAll:', error.message);

            return {
                message: error.message,
                status: error.status,
                code: error.code
            };
        }
    }

    async productFields(data: Product[]) {

        const fields = [
            "id",
            "name",
            "slug",
            "description",
            "short_description",
            "price",
            "sku",
            "regular_price",
            "price_html",
            "images",
            "in_stock",
            "purchasable",
            "dimensions",
            "related_ids",
            "parent_id",
            "attributes",
            "variations",
            "stock_quantity"
        ]; // campos a devolver

        const pickFields = (item: any) =>
            Object.fromEntries(fields.map(f => [f, item[f]]));

        if (Array.isArray(data)) {
            return data.map(pickFields);
        }

        return pickFields(data);
    }

    async clearCache() {

        if (typeof this.cacheManager.clear === 'function') {

            return this.cacheManager.clear();
        }

        return;
    }
}