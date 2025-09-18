import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class PaymentsService {

    private baseUrl = process.env.baseUrl || '';
    private consumerKey = process.env.consumerKey || '';
    private consumerSecret = process.env.consumerSecret || '';

    async getPaymentMethods() {

        const res = await axios.get(`${this.baseUrl}/payment_gateways`, {
            auth: {
                username: this.consumerKey,
                password: this.consumerSecret
            },
        });

        const enabledPaymentGateways = res.data.filter( item => item.enabled === true );

        return enabledPaymentGateways;

        return "Holaaa Payments desde sevicio";
    }
}