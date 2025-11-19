import { LuCircle, LuCircleCheckBig } from "react-icons/lu";
import { useSelector } from "react-redux";

export default function SelectedItem({item, role, id, title, text, changeCompleteStatus, changeDoneStatus, selectItem}) {
    const selected = useSelector(state => state.actions);

    const checkSelected = () => {
        const findItem = selected[item][role].items.find(item => item.id == id)
        if(findItem) {
            return true;
        } else {
            return false;
        }
    }
    const getItemDone =() => {
        const findItem = selected[item][role].items.find(item => item.id == id)
        console.log(findItem.doneStatus);
        return findItem.doneStatus;
    }
    
    return(
        <div className="w-full h-max vazir-medium flex flex-row justify-between items-center">
            <div onClick={() => {selectItem();changeCompleteStatus();}} className="flex flex-row items-center gap-[14px]">
                {checkSelected() ? <LuCircleCheckBig size={24} className="text-[#006ECF]"/> : <LuCircle size={24} className="text-[#d7d7d7]"/>}
                <div className="flex flex-col">
                    <span className="text-[15px] text-black">{title}</span>
                    <span className="text-[13px] text-[#878787]">{text}</span>
                </div>
            </div>
            {
                checkSelected() ? (
                    <div onClick={() => {changeDoneStatus();changeCompleteStatus();}} className={`w-[84px] h-[40px] flex justify-center items-center text-[16px] rounded-[10px] ${getItemDone() ? "bg-[#CDF2D3] text-[#00C313]" : "bg-[#D9D9D9] text-[#676767]"}`}>
                        انجام شد
                    </div> ) : ""
            }
        </div>
    )
}

