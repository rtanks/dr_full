import { IoCallOutline } from "react-icons/io5";
import DrItemManagement from "./DrItemManagement";
import { AiOutlineMail } from "react-icons/ai";
import { GoDeviceCameraVideo } from "react-icons/go";

export default function DrRecordManagement() {
    return(
        <>
            <DrItemManagement status={true} pay={"۱۴۰.۰۰۰"} title={"ثبت آزمایش"} text={"تماس آنی و چت"}>
                <IoCallOutline size={20}/>
            </DrItemManagement>
            <DrItemManagement status={true} pay={"۱۴۰.۰۰۰"} title={"ثبت تصویر برداری"} text={"تماس آنی و چت"}>
                <IoCallOutline size={20}/>
            </DrItemManagement>
            <DrItemManagement status={false} pay={"۱۴۰.۰۰۰"} title={"ثبت دارو"} text={"تماس آنی و چت"}>
                <AiOutlineMail size={20}/>
            </DrItemManagement>
            <DrItemManagement status={false} pay={"۱۴۰.۰۰۰"} title={"خدمات پاراکلنیک"} text={"تماس آنی و چت"}>
                <GoDeviceCameraVideo size={20}/>
            </DrItemManagement>
        </>
    )
}