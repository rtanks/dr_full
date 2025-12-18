import { useDispatch } from "react-redux";
import { getShowModal } from "../slices/modalSlice";
import registerRequestService from "../services/api/registerRequestService";

export default function Patient({id, info, getDataPatient}) {
    const dispatch = useDispatch();
    const {removeRequestMutation} = registerRequestService();
    const onDragStart = (e) => {
        e.dataTransfer.setData('text', id);
    }
    const closePatient = () => {
        if(confirm('آیا مطمئن هستید که می‌خواهید این بیمار حذف شود؟')) {
            removeRequestMutation.mutate(info.request._id);
        }
    }
    // console.log(info)
    return (
        <div onClick={() => {getDataPatient(info); dispatch(getShowModal({item: "editInfo"}))}} onDragStart={(e) => onDragStart(e)} key={id} id={id} onDragOver={(e) => e.preventDefault()} draggable={true} className="card">
            <div onClick={(e) => {e.stopPropagation();closePatient(id)}} className="delete-x" title="حذف بیمار">✕</div>
            <div className="meta">
                <div className="name">{info.user.fullName}</div>
                <div className="small">تلفن: <span>{info.user.phoneNumber}</span></div>
                <div className="small">کد ملی: <span>{info.user.nationalCode}</span></div>
                    {
                        info.request.request.explain ? (
                            <div className="small border-t border-t-[#a7a7a7] pt-2 mt-2">
                                {info.request.request.explain}
                            </div>
                            ): ""
                    }
                {/* <div className="small">استان: <span>{info.user.province}</span></div>
                <div className="small">شهر: <span>{info.user.city}</span></div>
                
                {
                    info.request.request.hasOwnProperty('dateRefer')? (
                        info.request.request.dateRefer != "" ? (
                         <div className="small">تاریخ مراجعه: <span>{info.request.request.dateRefer.date}</span></div>
                        ):("")
                    ): ("")
                }
                {
                    info.request.request.hasOwnProperty('medicine')? (
                        info.request.request.medicine.length != 0 ? (
                            <div className="small">
                                <div>داروها:</div>
                                <div className="meds-list">
                                    {
                                        info.request.request.medicine.map(item => (
                                            <div key={item.name} className="med-item flex flex-row flex-wrap">
                                                <span className="w-max">{item.name}</span>—
                                                <span className="w-max">{item.dose} mg میلی گرم</span>—
                                                <span className="w-max">{item.count} عدد</span>—
                                                <span className="w-max">{item.freq}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        ) : ("")
                    ): ("")
                } */}
                
            </div>
            
            
        </div>
    )
}
