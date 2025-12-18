import classNames from "classnames";
import { useEffect, useState } from "react";
import { LuCircle, LuCircleCheckBig } from "react-icons/lu";

export default function SelectItem({selectItem,onClick, title, status, items}) {
    const [doneStatus, setDoneStatus] = useState(false);
    const statusClass = classNames({
        "bg-[#CDF2D3] text-[#00C313]": items.length ? true : false,
        "bg-[#E6F3FF] text-[#006ECF]": (selectItem == title && status != "complete" && !items.length) ? true : false,
        "bg-[#efefef] text-[#898989]": (status == "incomplete" && !(selectItem == title ? true : false)) ? true : false
    })
    useEffect(() => {
        console.log(items)
        console.log(status)
        console.log(status == "complete" ? true : false)
        setDoneStatus(items.every(item => item == true))
    },[items])
    return(
        <div onClick={() => onClick(title)}
            className={`w-max px-[10px] py-[9px] shrink-0 vazir-medium flex flex-row justify-center items-center gap-[5px] text-[14px] rounded-[10px] ${statusClass}`}>
            {status == "complete" ? <LuCircleCheckBig size={15}/> : <LuCircle size={15}/>}
            {title}
        </div>
    )
}