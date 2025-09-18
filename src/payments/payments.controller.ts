import { Controller, Get } from "@nestjs/common";
import { PaymentsService } from "./payments.service";

@Controller('payments')
export class PaymentsController{

    constructor(
        private paymentsService: PaymentsService
    ){}

    @Get()
    getPaymentsMethods(){

        return this.paymentsService.getPaymentMethods();
    }

}