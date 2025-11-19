import Button from "./generalComponent/Button";
import InputWithShiftLabel from "./generalComponent/InputWithShiftLabel";
import TransactionItem from "./TransactionItem";

export default function Deposit() {
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
    ]
    return(
        <div className="w-full flex flex-col gap-5">
            <p className="text-[#676767] text-[15px]">واریز تنها به کارت یا شبا‌ی مطلق به شما انجام می‌گیرد
                مبلغ شبا در سِیگل های بانک مرکزی قرار می‌گیرد، لطفا در دریافت
                شبا صبور باشید </p>
            <InputWithShiftLabel title={"ورود مبلغ"} mode={"numeric"}/>
            <Button type={"button"} title={"انتقال به درگاه"} additionalStyle={"w-full bg-[#006ECF] text-white"}/>
            <div className="w-full h-max flex flex-col border-t-[6px] border-t-[#f5f5f5] gap-4 py-5">
                <div className="w-full text-[16px] text-black">تراکنش ها</div>
                <div className="w-full flex flex-col gap-5">
                    {
                        transactions.map((transaction, index) => <TransactionItem key={index} status={transaction.status} typeTransAction={"deposit"} price={transaction.price} shaba={transaction.shaba} time={transaction.time} date={transaction.date}/>)
                    }
                </div>
            </div>
        </div>
    )
}