import { Body, Controller, Get, Param, Patch, Post, Query, Res } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import type { Response } from "express";
import axios from "axios";
import { RequestsService } from "src/requests/requests.service";

@Controller('payment')
export class PaymentController {
  constructor(private paymentService:PaymentService){}

  @Post('request')
  async getBaseUrl(@Body('userId') userId:string, @Body('amount') amount:number, @Body('description') description:string) {
    console.log(userId, amount, description)
    return await this.paymentService.createPayment(userId, amount, description)
  }
  @Get('verify')
  async paymentVerify(@Query('Authority') authority: string, @Query('Amount') amount: number, @Query('Status') status: string) {
    const response = await this.paymentService.verifyPayment(authority,amount, status);
    return response;
  }

@Get('payment-inquiry/:id')
async paymentInquiry(@Param('id') id:string) {
  const transaction = await this.paymentService.findTransaction(id);
  if(!transaction) throw Error('تراکنش مورد نظر یافت نشد');
  const merchant = process.env.MERCHANT_ID; 
  const inquiry = await this.paymentService.paymentInquiry(String(transaction.authority),String(merchant))
  return inquiry; 
}
@Get(':id')
async getTransaction(@Param('id') id:string) {
  return await this.paymentService.findTransaction(id);
}
}

// async resultPayment(
//   @Res() res: Response,
//   @Query('Authority') authority: string,
//   @Query('Status') status: string,
//   @Query('Amount') amount: number
// ) {
//   const payment = await this.paymentService.findOne(authority);
//   const response = await this.paymentService.verifyPayment(authority, status, amount);

//   if (response.data.code === 100) {
//     if (payment) {
//       payment.status = response.data.message;
//       payment.refId = response.data.ref_id;
//       payment.payed = (response.data.message === 'Paid');
//       await payment.save();
//     }

//     if (status === 'OK') {
//       res.redirect(`${process.env.FRONTEND_URL}/payment/success?id=${payment?._id}`);
//     } else {
//       return res.redirect(`${process.env.FRONTEND_URL}/payment/failed?id=${payment?._id}&&merchant_id=${process.env.MERCHANT_ID}&&authority=${authority}`);
//     }
//   } else {
//     res.redirect(`${process.env.FRONTEND_URL}/payment/failed?id=${payment?._id}`);
//   }
// }