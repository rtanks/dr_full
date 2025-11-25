import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import ZarinPal from "zarinpal-node-sdk";
import { Payment, PaymentDocument } from "./entities/payment.entity";
import { Model } from "mongoose";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";


@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment.name) private paymentModel:Model<PaymentDocument>){}

  zarinpal= new ZarinPal({
    merchantId: process.env.MERCHANT_ID,
    sandbox: false
  })

  async createPayment(createPaymentDto:CreatePaymentDto) {
    const res = await this.zarinpal.payments.create({
      amount: createPaymentDto.amount,
      description: createPaymentDto.description,
      callback_url: `${process.env.BACKEND_URL}/payment/verify?Amount=${createPaymentDto.amount}`,
    })
    if(res.data.code != 100) {
      throw new Error(`خطا در زرین پال: ${res.data.message}`)
    }
    const requestPay = await this.paymentModel.create({...createPaymentDto, authority: res.data.authority})
    return {
      authority: res.data.authority,
      // url: `https://payment.zarinpal.com/pg/StartPay/${res.data.authority}`,
      url: `${this.zarinpal.payments.getRedirectUrl(res.data.authority)}?Currency=IRT`,
      res: res,
      data: requestPay
    };
  }

  async verifyPayment(authority: string, amount: number) {
    const res = this.zarinpal.verifications.verify({
      amount: amount,
      authority: authority
    })
    return res
  }

  async findOne(authority:string) {
    let payment = await this.paymentModel.findOne({authority});
    return payment;
  }
 
  async findTransaction(id:string) {
    const res = await this.paymentModel.findById(id);
    if(!res) throw new Error('تراکنش یافت نشد')
    return res;
  }
}