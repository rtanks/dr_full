import PatientInfo from "../components/PatientInfo";
import RequestAndExplain from "../components/RequestAndExplain";
import ContainerDrawer from "../components/generalComponent/ContainerDrawer";
import TestHeader from "../components/generalComponent/HeaderTest";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function Transportation({onClick}) {
  const [price, setPrice] = useState("");
  const onChange = (e) => {
      setPrice(e.target.value);
      console.log(price)
  }
  return (
    <ContainerDrawer onClick={onClick} header={"حمل و نقل"}>
        <div className="w-[90%] mt-10 mx-auto flex flex-col gap-5 items-center pb-5">
          <PatientInfo name={"اشکان حسنوندی"} phoneNumber={"09216919291"} time={"14:45"}
            date={"1404/12/01"} nationalCode={"4060405531"} insurance={"آزاد"}/>
          <RequestAndExplain typeRequest={"گرافی"} titleRequest={"کف دست راست - مچ دست راست "}/>
        </div>
        <div className="w-full h-max border-t-[6px] border-[#efefef] pb-52">
          <div className="w-[90%] mt-5 mx-auto flex flex-col gap-5 items-center">
            <p className="text-[14px] text-[#5f5f5f] senten">
              دوست عزیز با توجه به موارد ذکر شده شما نیاز به مراجعه به پزشک متخصص جراحی عمومی
              احتمال نیاز به آزمایشات مرتبط با موضوع بیماری وجود دارد و اگر مدارک و سابقه قبلی دارید در موقع ویزیت ذکر کنید موارد در بخش توضیحات نیامده و میتواند کمک کننده به تشخیص
              بهتر پزشک شود .
            </p>
            <p className="text-[14px] text-[#5f5f5f]">
              برای ویزیت پزشک پیشنهادی، فیروز شاه مرادی متخصص جراحی عمومی کلیک کنید
            </p>
          </div>
        </div>
      <div className="w-full sm:w-[402px] border-t border-t-[#f5f5f5] mr-auto fixed bottom-0 left-0 right-0 bg-white flex flex-col gap-3">
        <div className="w-full px-5 pt-2">
            <span className="text-[14px] text-[#676767]">ایجاد سند پرداخت</span>
            <div className="w-full h-[53px] text-[16px] flex flex-row items-center gap-2 px-4 border border-[#909090] rounded-[15px] mt-2">
                <input onChange={(e) => onChange(e)} type="text" value={price} placeholder="ورود مبلغ" className="text-[#676767] placeholder:text-[#909090] border-0 outline-0 w-[90%]"/>
                <span className="text-[#909090]">تومان</span>
                <button type="button" onClick={() => setPrice("")}>
                    <IoCloseCircleOutline size={24} className="text-[#676767]"/>
                </button>
            </div>
        </div>
        <div className="w-full border-t border-t-[#eee] flex flex-row gap-2 px-5 py-4">
            <button type="button" className="w-[178px] h-12 flex text-[15px] items-center justify-center rounded-[10px] border bg-transparent text-[#ff0000]">رد درخواست</button>
            <button type="button" className="w-[178px] h-12 flex text-[15px] items-center justify-center rounded-[10px] bg-[#006ecf] text-white">انجام شد</button>
        </div>
      </div>
    </ContainerDrawer>
  );
}
