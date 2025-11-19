import BorderGeneral from "./BordergeneralTest"
import Cost from "./cost"
import Ordersummary from "./Ordersummary"
import Payable from "./Payable"
import RequestButton from "./RequestButton"
import { Input } from "./Inputs"
import GoBack from './GoBack'
import CompleteTitle from "../CompleteTitle"
import { useDispatch } from "react-redux"
import { completeOrder } from "../../slices/requestSlice"

export default function PaymentAndComplete({selectStep}) {
    const dispatch = useDispatch();
    const clickHandler = () => {
        dispatch(completeOrder());
        localStorage.removeItem('order');
        selectStep('');
    }
    return (
        <div className="w-full h-max flex flex-col gap-5">
            <GoBack step={"step2"} selectStep={selectStep}/>
            <CompleteTitle title={"خلاصه سفارش"} />
            <Ordersummary />
            <BorderGeneral />
            <div className="w-full h-max">
                <CompleteTitle title={'صورت حساب'} />
                <div className="w-[90%] mx-auto my-3">
                    <Input placeholder={'کد تخفیف'} />
                </div>
                <Cost Firstcost={'ویزیت پزشک برای ثبت دارو 216.000 تومان'} />
                <Payable />
            </div>
            <RequestButton text={'انتقال به درگاه'} onClick={clickHandler}/>
        </div>
    )
}