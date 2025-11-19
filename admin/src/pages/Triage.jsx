import PatientInfo from "../components/PatientInfo";
import TestHeader from "../components/generalComponent/HeaderTest";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import needForActionService from "../services/api/dashboard.api/needForActionService";
import { useQuery } from "@tanstack/react-query";
import ContainerDrawer from "../components/generalComponent/ContainerDrawer";

export default function Triage({onClick}) {
  const [price, setPrice] = useState("");
  const onChange = (e) => {
      setPrice(e.target.value);
      console.log(price)
  }
  const { getTriages} = needForActionService();
  const {data, isLoading} = useQuery({queryKey: ["triages"], queryFn: getTriages});
  useEffect(() => {
    console.log(data)
  }, [data])
  if(isLoading) return <Loading/>
  return (
    <ContainerDrawer onClick={onClick} header={"تریاژ"}>
        <div className="w-[90%] mt-10 mx-auto flex flex-col gap-2 items-center">
          <PatientInfo name={"اشکان حسنوندی"} phoneNumber={"09216919291"} time={"14:45"}
            date={"1404/12/01"} nationalCode={"4060405531"} insurance={"آزاد"}/>
          <div className="w-full h-max text-[18px]">درخواست تریاژ</div>
          <div className="w-full h-max text-[14px] text-[#5f5f5f]">کف دست راست - مچ دست راست </div>
          <p className="w-full h-max mb-5 text-[14px] text-[#5f5f5f]">
            توضیحات بیمار :من مسبیز عسثبت تثقصخه3عض کم-ا=تهقتنن 0ه9ضصثن09
            00نضث-ئش9پن9 9نت9ض2تپست9ت 9 ت9 تئ90ثت29ضتص0شسیتطتئ 90تقنضص39شثتنظ9ت
            ئ9ض3قتش0ب9پزتط089ت 99
          </p>
        </div>
        <div className="w-full flex flex-col items-center h-max border-t-[6px] border-t-[#efefef] pb-52">
          <div className="w-[90%] h-max py-5 flex flex-col gap-4">
            <p className="text-[14px] text-[#5f5f5f]">
              دوست عزیز با توجه به موارد ذکر شده شما نیاز به مراجعه به پزشک متخصص جراحی عمومی دارید
              احتمال نیاز به آزمایشات مرتبط با موضوع بیماری وجود دارد و اگر مدارک
              و سابقه قبلی دارید در موقع ویزیت ذکر کنید موارد در بخش توضیحات نیامده و میتواند کمک کننده به تشخیص
              بهتر پزشک شود .
            </p>
            <div className="w-full h-max flex flex-col gap-3">
              <p className="text-[14px] text-[#5f5f5f]">
                برای ویزیت پزشک پیشنهادی، فیروز شاه مرادی متخصص جراحی عمومی کلیک کنید
              </p>
              <a href="https://www.tda24.ir/1245785" className="hover:cursor-pointer text-[14px] text-[#006ECF]">www.tda24.ir/1245785</a>
            </div>

            <div className="w-full h-max flex flex-col gap-4">
              <p className="text-[14px] text-[#5f5f5f]">
                لیست کامل پزشک متخصصین جراحی عموم
              </p>
              <a href="https://www.tda24.ir/ل1452" className="hover:cursor-pointer text-[14px] text-[#006ECF] flex flex-row-reverse self-start">
                <span>www.tda24.ir</span>/
                <span>ل1452</span>
              </a>
            </div>

          </div>
        </div>
        <div className="w-full sm:w-[402px] mr-auto fixed bottom-0 left-0 right-0 bg-white flex flex-col gap-3">
            <div className="w-full border-t border-t-[#f5f5f5] px-5 pt-2">
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
