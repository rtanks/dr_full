import { Body, Controller, Get, Param, Patch, Post, Query, Res } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import type { Response } from "express";

@Controller('payment')
export class PaymentController {
  constructor(private paymentService:PaymentService){}

  @Post('request')
  async createRequest(@Body() createPaymentDto:CreatePaymentDto) {
    const request = await this.paymentService.createPayment(createPaymentDto)
    return request;
  }

  @Get('verify')
  async verifyPayment(@Res() response:Response , @Query('Authority') authority:string, 
  @Query('Status') status:string, @Query('Amount') amount:number){
    const res = await this.paymentService.verifyPayment(authority, amount);
    let payment = await this.paymentService.findOne(authority);
    if(status === 'OK') {
      if(payment) {
        payment.status = res.data.message;
        payment.refId = res.data.ref_id,
        payment.payed = (res.data.message == 'Paid');
        payment?.save();
      }
    }
    if(payment?.payed) {
      response.redirect(`${process.env.FRONTEND_URL}/payment/success?id=${payment._id}`);
    } else {
      response.redirect(`${process.env.FRONTEND_URL}/payment/failed`);
    }
    return {res, status, payment};
  }

  @Get(':id')
  async getTransaction(@Param('id') id:string) {
    return await this.paymentService.findTransaction(id);
  }
}