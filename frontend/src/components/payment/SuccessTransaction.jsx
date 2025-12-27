import { ButtonPayment } from "../../page/payment/ButtonPayment";
import { transformFormatWithSpreadEn } from "../../services/func/transformFunc";
import { FaCircleCheck } from "react-icons/fa6";
import { easeOut, motion } from 'framer-motion';
import registerRequestService from "../../services/api/registerRequestService";
import { getCategory } from "../../services/func/getTypeRequest";

export default function SuccessTransAction({data, userId, amount}) {
    const {registerRequestEndMutation} = registerRequestService();
    const onClickHandler = () => {
      console.log({statusPay: data.payed ? 'success' : 'failed', transactionId: data.id})
      const dataRequest = {transactionId: data.id, statusPay: data.payed ? 'success' : 'failed'}
      registerRequestEndMutation.mutate(dataRequest)
    }
    return (
        <>
            <motion.div animate={{scale: [0.5, 1], opacity:[0,1], transition:{duration: 0.5, ease:easeOut}}} className="icon-wrapper">
              <FaCircleCheck className="mx-auto text-success"/>
            </motion.div>
            <h1 className="main-title">پرداخت موفق بود</h1>
            <p className="message">تراکنش شما با موفقیت ثبت و نهایی گردید.</p>
            <div className="details">
              <div className="detail-item">
                <span>شماره پیگیری (Ref ID):</span>
                <strong>9876543210</strong>
              </div>
              <div className="detail-item">
                <span>مبلغ پرداخت شده:</span>
                <strong>{transformFormatWithSpreadEn(amount)} ریال</strong>
              </div>
              <div className="detail-item">
                <span>زمان و تاریخ:</span>
                <strong id="date-time"></strong>
              </div>
            </div>
            <ButtonPayment type={'button'} onClick={onClickHandler} bg={"bg-success"} color={"text-[#fff]"} additionalClass={"hover:bg-[#218838]"} text={"بازگشت به سامانه تی دا"}/>
            <p className="footer-note text-[#1e7e34]">تی دا: سامانه آموزش و درمان کشور</p>
        </>
    )
}