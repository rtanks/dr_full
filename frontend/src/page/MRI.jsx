import CompleteOrderStepOne from "../components/request/CompleteOrderStepOne";
import HeaderRequestStatus from "../components/request/HeaderRequestStatus";
import { getTypeRequest } from "../services/func/getTypeRequest";

export default function MRL() {
    return (
        <div className="w-full h-max flex flex-col gap-3">
            <HeaderRequestStatus typeRequest={'مشاوره جدید'} titleRequest={getTypeRequest()} 
            statusRequest={'در حال انجام'} date={'1404/12/22'} time={'14:45'}/>
            <CompleteOrderStepOne/>
        </div>
    )
}