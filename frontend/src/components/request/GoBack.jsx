import { IoArrowBackSharp } from "react-icons/io5";
export default function GoBack({step,selectStep}) {
    return (
        <div className="w-full h-max flex items-center justify-end mt-2 sm:mt-5 hover:cursor-pointer">
            <IoArrowBackSharp size={24} onClick={() => selectStep(step)}/>
        </div>
    )
}