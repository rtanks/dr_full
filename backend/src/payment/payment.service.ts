import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import ZarinPal from "zarinpal-node-sdk";
import { Payment, PaymentDocument } from "./entities/payment.entity";
import { Model } from "mongoose";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import axios from "axios";


@Injectable()
export class PaymentService {
  constructor(@InjectModel(Payment.name) private paymentModel:Model<PaymentDocument>){}

  zarinpal= new ZarinPal({
    merchantId: process.env.MERCHANT_ID,
    sandbox: false,
  })
  async createPayment(userId:string, amount:number, description:string) {
    const response = await this.zarinpal.payments.create({
      amount: amount,
      description: description,
      callback_url: `${process.env.FRONTEND_URL}/payment/verify?amount=${amount}`,
      //   mobile?: string,
      //   email?: string,
      //   cardPan?: string | string[],
      //   referrer_id?: string 
    });
    if(response.data.code == 100) {
      const requestPay = await this.paymentModel.create({userId, amount, description, authority: response.data.authority})
      return {
        response,
        //this command add authority to parameter url
        url: `${this.zarinpal.payments.getRedirectUrl(response.data.authority)}`,
        requestPay
      }
    }
    return {
      response,
    };
  }
  //------------------------------
  async verifyPayment(authority:string, amount:number, status:string) {
    const payment = await this.paymentModel.findOne({ authority });
    const nowDate = new Date(Date.now());
    if(status === 'OK') {
      const response = await this.zarinpal.verifications.verify({
        amount: amount,
        authority: authority
      })
      if(response.data.code == 100) {
        if(payment) {
          payment.payed = true;
          payment.message = response.data.message;
          payment.code = response.data.code;
          payment.refId = response.data.ref_id;
          payment.status = 'success';
          payment.verifyAt = nowDate;
          payment.save();
        }
        return {code: response.data.code, payed: payment?.payed, id: payment?._id, refId: response.data.ref_id, date: nowDate,  message: response.data.message, payment};
      } else if(response.data.code == 101) {
        return {code: response.data.code, payed: payment?.payed, id: payment?._id, refId: response.data.ref_id, date: nowDate,  message: 'پرداخت اعتبار سنجی شده!', payment}
      } else {
        if(payment) {
          payment.payed = false;
          payment.message = response.data.message;
          payment.code = response.data.code;
          payment.status = 'failed';
          payment.verifyAt = nowDate;
          payment.save();
        }
        return {code: response.errors.code, payed: payment?.payed, id: payment?._id, date: nowDate,  description: payment?.description,message: "خطا در انجام تراکنش!"}
      }
    } else {
      if(payment) {
          payment.payed = false;
          payment.message = "pay canceled";
          payment.status = 'pending';
          payment.verifyAt = nowDate;
          payment.code = 0;
          payment.save();
        }
      return {code: 0, payed: payment?.payed, id: payment?._id, date: nowDate,  message: 'تراکنش لغو شد!'}
    }
  }
  
  async paymentInquiry(authority:string, merchant_id:string) {
    // return await axios.post('https://payment.zarinpal.com/pg/v4/payment/inquiry.json', 
    return await axios.post('https://sandbox.zarinpal.com/pg/v4/payment/inquiry.json', 
      { merchant_id, authority },{
        headers: {
          'Content-Type': "application/json",
          'Accept': "application/json"
        }
      }).then(res => res.data.data.status).catch(err => err);
}
// -------------------------------------------------------------
async findOne(authority:string) {
  let payment = await this.paymentModel.findOne({authority});
  return payment;
}
async findTransaction(id:string) {
  const res = await this.paymentModel.findById(id);
  if(!res) throw new Error('تراکنش یافت نشد')
    return res;
}
// -------------------------------------------------------------
}
//----------explain-------------
//this get baseUrl of zarinpal
//sandbox = true -> https://sandbox.zarinpal.com this for development mode
//sandbox = false -> https://payment.zarinpal.com
// this.zarinpal.getBaseUrl() 

//The Inquiries resource for inquiring about payment statuses.
// this.zarinpal.inquiries
