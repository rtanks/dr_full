import { useState } from "react";
import Button from "./generalComponent/Button";
import InputWithShiftLabel from "./generalComponent/InputWithShiftLabel";
import TransactionItem from "./TransactionItem";
import RecordRequestWithdraw from "./generalComponent/RecordRequestWithdraw";
import ModalWithdraw from "./ModalWithdraw";

export default function Withdraw() {
    const transactions = [
        {
            status: "در حال بررسی",
            price: 50000,
            shaba: "45 5555 5555 8888 9999 9999 52",
            time: "14:45",
            date: "1404/12/08"
        },
        {
            status: "رد شد",
            price: 50000,
            shaba: "45 5555 5555 8888 9999 9999 52",
            time: "14:45",
            date: "1404/12/08"
        },
        {
            status: "تایید شد",
            price: 50000,
            shaba: "45 5555 5555 8888 9999 9999 52",
            time: "14:45",
            date: "1404/12/08"
        },
    ];
    const [pay, setPay] = useState(false);
    const [showModal, setShowModal] = useState(false)

    return(
        <div className="w-full flex flex-col gap-5">
            <p className="text-[#676767] text-[15px]">واریز تنها به کارت یا شبا‌ی مطلق به شما انجام می‌گیرد
                مبلغ شبا در سِیگل های بانک مرکزی قرار می‌گیرد، لطفا در دریافت
                شبا صبور باشید </p>
            {
                pay ? (
                    <div className="w-full flex flex-row gap-2 items-center">
                        <RecordRequestWithdraw title={"ورود کد پیامک شده"} mode={"numeric"} additionalStyle={"w-1/2"}/>
                        <Button type={"button"} title={"ثبت"} onClick={() => setShowModal(true)} additionalStyle={"w-1/2 bg-[#006ECF] text-white"}/>
                    </div> 
                ) : (
                    <>
                        <InputWithShiftLabel title={"مبلغ را وارد نمایید"} mode={"numeric"} />
                        <Button type={"button"} title={"درخواست برداشت"} onClick={() => setPay(true)} 
                        additionalStyle={"w-full bg-gray-200"}/>
                    </>
                ) 
            }
           <div className="w-full h-max flex flex-col border-t-[6px] border-t-[#f5f5f5] gap-4 py-5">
                <div className="w-full text-[16px] text-black">تراکنش ها</div>
                <div className="w-full flex flex-col gap-5">
                    {
                        transactions.map((transaction, index) => <TransactionItem key={index} status={transaction.status} typeTransAction={"withdraw"} price={transaction.price} shaba={transaction.shaba} time={transaction.time} date={transaction.date}/>)
                    }
                </div>
           </div>
            <ModalWithdraw showModal={showModal} onClick={() => setShowModal(false)}/>
        </div>
    )
}