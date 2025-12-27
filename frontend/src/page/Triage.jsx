import CompleteOrderStepOne from "../components/request/CompleteOrderStepOne";
import { pricesList } from "../constant/priceList";

export default function Triage() {
    return (
        <div className="w-full h-full flex flex-col gap-1">
            <CompleteOrderStepOne price={pricesList[1].price} text={pricesList[1].text}/>
        </div>
    )
}