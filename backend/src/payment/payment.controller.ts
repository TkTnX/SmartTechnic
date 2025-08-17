import { Body, Controller, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";

@Controller("payments")
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }
    
    @Post('/change-status')
    async changeStatus(@Body() body: any) {
        return await this.paymentService.changeStatus(body)
    }
}