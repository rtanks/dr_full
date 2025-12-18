import { ImCross } from "react-icons/im";
import Info from "./Info";

export default function PaymentModalContainer({close}) {
    return (
        <div onClick={close} className="w-full h-full flex justify-center absolute left-0 top-0 bg-[#0009] z-50">

            <div onClick={(e) => e.stopPropagation()} className="w-[90%] sm:w-[30%] border-t-4 border-t-main h-max mt-10 p-2 sm:p-5 sm:items-center rounded-xl bg-white flex flex-col pb-1">
                <div className='w-full h-max text-left px-1 sm:px-5 pt-2'>
                    <button onClick={close} type='button'>
                        <ImCross size={15} color='#ddd'/>
                    </button>
                </div>
                <div className='w-full h-max flex flex-col gap-2'>
                    <Info/>
                </div>
            </div>
        </div>
    )
}