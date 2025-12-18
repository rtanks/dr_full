import { useNavigate } from "react-router-dom";
import NoRequest from "../general/NoRequest";
import HistoryItem from "./HistoryItem";
import { useQueryClient } from "@tanstack/react-query";

export default function HistoryDoctor({history}) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const clickHandler = (idHistory) => {
        navigate(`/request/${idHistory}`)
        queryClient.invalidateQueries({queryKey:['history']})
    }
    return (
        <div className="w-full h-max bg-white rounded-2xl flex flex-col gap-2 p-1">
            {
                history.length != 0 ? (
                    history.map(item => (
                        <HistoryItem key={item._id} id={item._id} onClick={() => clickHandler(item._id)} 
                            date={item.createdAt} service={item.request.service} payed={item.statusPay}/>
                    ))
                ) : (
                    <NoRequest text={'سابقه مشاوره پزشکی یافت نشد!'} wImg={'w-4/5 mt-[40%]'}/>
                )
            }
           {/* <HistoryItem date={"2025-11-23T13:49:42.171Z"}/>
           <HistoryItem date={"2025-11-23T13:49:42.171Z"}/>
           <HistoryItem date={"2025-11-23T13:49:42.171Z"}/>
           <HistoryItem date={"2025-11-23T13:49:42.171Z"}/> */}
        </div>
    )
}