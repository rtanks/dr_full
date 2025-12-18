import classNames from "classnames"
import { useState } from "react"
import HeaderAuth from "../../services/api/headerAndUrlService";
import axios from "axios";
import { convertDateToLocalFormat } from "../../services/func/transformDate";
import { persianToEnglishDigits } from "../../services/func/transformFunc";

export default function MessageItem({id,title, date, children, link, index, onClick, status}) {
    const [open, setOpen] = useState(false);
    const messageClassStatus = classNames({
        "line-clamp-none": open,
        "line-clamp-1": !open,
    })
    const onClickHandler = () => {
        if(index){
            onClick("read", index);
            setOpen(prev => !prev);
        } else {
            const {baseUrl, headers} = HeaderAuth();
            if(status == 'unread') {
                axios.patch(`${baseUrl}/user-messages/change-status/${id}`).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            }
            setOpen(prev => !prev);
        }

    }
    return (
        <>
            <div onClick={onClickHandler} className={`border rounded-xl py-3 px-3.5 flex cursor-pointer flex-col gap-2 mt-2 
            ${status == "unread"? "bg-[#e6fbf2] hover:bg-[#d2f5e4] border-[#15a35d]" : " bg-white border-[#cbd5e1]"}`}
                data-id="1" style={{transition: '.2s ease'}}>
                <div className="msg-header">
                  <div className="msg-title">
                    <div className={`w-3 h-3 rounded-full ${status =='unread'? "bg-[#15a35d]": "bg-[#cbd5e1]"}`}></div>
                        {title}
                  </div>
                  <button onClick={(e) => {e.stopPropagation();window.open(link, '_blank')}} className="btn-link">رفتن به</button>
                </div>
                <div className={`text-sm text-[#333] ${messageClassStatus}`}>
                    {children}
                </div>
                <div className="msg-footer">
                  <span className="toggle-label">{!open? "نمایش بیشتر": "نمایش کمتر"}</span>
                  {
                    date? (
                        <span className="date-time flex flex-row gap-1.5 items-center">
                            <span>{persianToEnglishDigits(convertDateToLocalFormat(date).time)}</span>
                            <span>{persianToEnglishDigits(convertDateToLocalFormat(date).dateValue)}</span>
                        </span>
                    ) : (
                        <span className="date-time">12:45&nbsp;&nbsp;1404/12/12</span>
                    )
                  }
                </div>
            </div>
        </>
    )
}