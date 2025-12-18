import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Otp, OtpDocument } from "./otp.entity";
import crypto from 'crypto';
import axios from 'axios';


@Injectable()
export class OtpService {
    constructor(@InjectModel(Otp.name) private otpModel: Model<OtpDocument>){}
    async generateOtp (phoneNumber: string) {
        //expire
        const nowDate = new Date(Date.now());//this for transform local tim to utc format
        const exitingOtp = await this.otpModel.findOne({phoneNumber, used: false});
        if(exitingOtp && exitingOtp.expiresAt > nowDate) {
            throw new BadRequestException('کد تایید  قبلی هنوز معتبر است، منتظر بمانید');
        }

        //rate limit
        const lastHour = new Date(Date.now() - 216000000)
        const count = await this.otpModel.countDocuments({phoneNumber, createdAt: {$gte: lastHour}})

        if(count > 10) {
            throw new ForbiddenException('تعداد درخواست بیش از حد است، لطفاً بعداً تلاش کنید.')
        }
        const code = crypto.randomInt(1000, 9999);
        const expires = new Date(Date.now() + 120000);
        console.log(expires)
        const otp = await this.otpModel.create({phoneNumber , code, expiresAt: expires});

        const data = JSON.stringify({mobile: phoneNumber, templateId: '744300', 
            parameters: [{name: "CODE" , value: String(code)}],});
        const sms = await axios.post('https://api.sms.ir/v1/send/verify', data, 
            {headers: {
                'Content-Type': 'application/json','Accept': 'text/plain',
                'x-api-key': 'L40UGRICQDvHN3F93OuDafT0xiom3okCphDgtrAfYjpng77f9ZzNaahQGyp9wI5b'
            }}).then(res => res).catch(err => {
                this.otpModel.deleteOne({ _id: otp._id });
                throw new BadRequestException(
                    err.response || 'خطا در ارسال پیامک'
                );
            })
        
        // return {otp};
        return sms.data;
    }

    async verifyOtp(phoneNumber:string, otp:number) {
        const otpCreated = await this.otpModel.findOne({phoneNumber, code:otp, used: false});
        if(!otpCreated) {
            throw new BadRequestException('کد وارد شده معتبر نیست')
        }
        otpCreated.used = true;
        await otpCreated.save();

        return {message: "success", otpCreated}
    }
 
}
// async generateOtp2(phoneNumber: string) {
//     const code = crypto.randomInt(100000, 999999);
//     const data = JSON.stringify({"mobile": phoneNumber,"templateId": "YourTemplateID",
//         "parameters": [{name: 'کد تایید' , value: `${code}`}],});
//     const config = {method: 'post',url: 'https://api.sms.ir/v1/send/verify',  
//         headers: {'Content-Type': 'application/json','Accept': 'text/plain','x-api-key': 'YOURAPIKEY'},
//         data : data};
//     return await axios.post(config.url, config.data, {headers: config.headers}).then(res => res).catch(err => err)
// }