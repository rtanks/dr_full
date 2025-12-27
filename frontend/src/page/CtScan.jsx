import CompleteOrderStepOne from "../components/request/CompleteOrderStepOne";
import { pricesList } from "../constant/priceList";

export default function CtScan() {
    return (
        <div className="w-full h-full flex flex-col gap-1">
            <CompleteOrderStepOne price={pricesList[0].price} text={pricesList[0].text}/>
        </div>
    )
}