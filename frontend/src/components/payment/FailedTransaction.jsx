import { ButtonPayment } from "../../page/payment/ButtonPayment";
import { persianToEnglishDigits, transformFormatWithSpreadEn } from "../../services/func/transformFunc";
import { IoCloseCircle } from "react-icons/io5";
import { easeOut, motion } from 'framer-motion';
import registerRequestService from "../../services/api/registerRequestService";
import LoadingGateway from "./LoadingGateway";
import { useState } from "react";
import { getCategory } from "../../services/func/getTypeRequest";

export default function FailedTransAction({data, amount, userId}) {
    const [loading, setLoading] = useState(false);
    const {registerRequestEndMutation,getDataRequestFromDraft, transitionToGatewayMutation} = registerRequestService();
    const onClickHandler =  async () => {
        await getDataRequestFromDraft().then(res => {
            console.log({userId, data: res.data, statusPay: data.payed, transactionId: data.id})
            const dataRequest = {userId, category: getCategory(res.data.service), request: res.data, statusPay: data.payed, transactionId: data.id}
            registerRequestEndMutation.mutate(dataRequest)
        });
    }
    const retryGateway = async () => {
      setLoading(true);
      transitionToGatewayMutation.mutateAsync({amount: amount, description: data.description}).then(res => {
          setLoading(false)
      })
    }
    return (
        <>
            <motion.div animate={{scale: [0.5, 1], opacity:[0,1], transition:{duration: 0.5, ease: easeOut}}} className="icon-wrapper">
              <IoCloseCircle className="mx-auto text-failed"/>
            </motion.div>
            <h1 className="main-title">پرداخت ناموفق بود</h1>
            <p className="message">متأسفانه تراکنش شما با خطا مواجه شد.<br/> لطفا مجدداً تلاش کنید.</p>
            <div className="details">
              <div className="detail-item">
                <span>کد خطا:</span>
                <strong>E4{"000".slice(0, 3 - (`${data.code}`).length)}{data.code}</strong>
              </div>
              <div className="detail-item">
                <span>مبلغ درخواستی:</span>
                <strong>{transformFormatWithSpreadEn(amount)} ریال</strong>
              </div>
              <div className="detail-item">
                <span>زمان و تاریخ:</span>
                <span id="date-time" className="flex flex-row gap-1 items-center">
                  <strong>{persianToEnglishDigits(data.time)}</strong>
                  <strong>{persianToEnglishDigits(data.dateValue)}</strong>
                </span>
              </div>
            </div>
            <ButtonPayment onClick={retryGateway} type={'button'} bg={"bg-failed"} color={"text-[#fff]"} additionalClass={"hover:bg-[#c82333] btn-failed"} text={"تلاش دوباره"}/>
            <ButtonPayment onClick={onClickHandler} type={'button'} bg={"bg-transparent"} color={"text-[#6c757d]"} additionalClass={"hover:bg-[#e9ecef] border border-[#ced4da]"} text={"بازگشت به سامانه تی دا"}/>
            <p className="footer-note text-[#1e7e34]">تی دا: سامانه آموزش و درمان کشور</p>
            {loading && <LoadingGateway amount={amount}/>} 
        </>
    )
}