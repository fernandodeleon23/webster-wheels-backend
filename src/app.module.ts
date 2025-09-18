import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { ProductModule } from './products/products.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true
		}),
		ProductModule,
		PaymentsModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
