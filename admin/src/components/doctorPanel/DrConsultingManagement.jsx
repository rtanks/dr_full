import { IoCallOutline } from "react-icons/io5";
import DrItemManagement from "./DrItemManagement";
import { AiOutlineMail } from "react-icons/ai";
import { GoDeviceCameraVideo } from "react-icons/go";

export default function DrConsultingManagement({onClick}) {
    return (
        <>
           <DrItemManagement status={true} pay={"۱۴۰.۰۰۰"} title={"اورژانسی"} text={"تماس آنی، چت و دریافت نسخه"}>
                <IoCallOutline size={20}/>
           </DrItemManagement> 
           <DrItemManagement status={true} pay={"۱۴۰.۰۰۰"} title={"تلفنی"} text={"تماس آنی، چت و دریافت نسخه"}>
                <IoCallOutline size={20}/>
           </DrItemManagement> 
           <DrItemManagement status={false} pay={"۱۴۰.۰۰۰"} title={"متنی"} text={"تماس آنی، چت و دریافت نسخه"}>
                <AiOutlineMail size={20}/>
           </DrItemManagement> 
           <DrItemManagement status={false} pay={"۱۴۰.۰۰۰"} title={"تصویری"} text={"تماس آنی، چت و دریافت نسخه"}>
                <GoDeviceCameraVideo size={20}/>
           </DrItemManagement> 
           <DrItemManagement onClick={onClick} status={false} pay={"۱۴۰.۰۰۰"} title={"حضوری"} text={"تماس آنی، چت و دریافت نسخه"}>
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3419 2.56445H4.03688C3.14494 2.56445 2.42188 3.33005 2.42188 4.27445V16.2445C2.42188 17.1889 3.14494 17.9545 4.03688 17.9545H15.3419C16.2338 17.9545 16.9569 17.1889 16.9569 16.2445V4.27445C16.9569 3.33005 16.2338 2.56445 15.3419 2.56445Z" 
                    stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.07484 5.98438H5.65234V13.6794H8.07484V5.98438Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.7272 5.98438H11.3047V10.2594H13.7272V5.98438Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
           </DrItemManagement> 
        </>
    )
}