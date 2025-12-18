import { ButtonPayment } from "../../page/payment/ButtonPayment";
import { persianToEnglishDigits} from "../../services/func/transformFunc";
import { IoCloseCircle } from "react-icons/io5";
import {easeOut, motion} from 'framer-motion'
import registerRequestService from "../../services/api/registerRequestService";
import { getCategory } from "../../services/func/getTypeRequest";

export default function CanceledTransAction({data, amount, userId}) {
    const {registerRequestEndMutation,getDataRequestFromDraft} = registerRequestService();
    const onClickHandler =  async () => {
      await getDataRequestFromDraft().then(res => {
          console.log({userId, data: res.data, statusPay: data.payed, transactionId: data.id})
          const dataRequest = {userId, category: getCategory(res.data.service),request: res.data, statusPay: data.payed, transactionId: data.id}
          registerRequestEndMutation.mutateAsync(dataRequest)
      });
    }
    return (
        <>
            <motion.div animate={{scale: [0.5, 1], opacity:[0,1], transition:{duration: 0.5, ease: easeOut}}} className="icon-wrapper">
              <IoCloseCircle className="mx-auto text-failed"/>
            </motion.div>
            <h1 className="main-title">{data.message}</h1>
            <div className="details">
              <div className="detail-item">
                <span>زمان و تاریخ:</span>
                <span id="date-time" className="flex flex-row gap-1 items-center">
                  <strong>{persianToEnglishDigits(data.time)}</strong>
                  <strong>{persianToEnglishDigits(data.dateValue)}</strong>
                </span>
              </div>
            </div>
            <ButtonPayment type={'button'} onClick={onClickHandler} bg={"bg-failed"} color={"text-[#fff]"} 
            additionalClass={"hover:bg-[#c82333] btn-failed"} text={"بازگشت به سامانه تی دا"}/>
            <p className="footer-note text-[#1e7e34]">تی دا: سامانه آموزش و درمان کشور</p>
            
        </>
    )
}