import { useState } from "react";
import DoctorInformation from "../doctorPanel/DoctorInformation";
import classNames from "classnames";
import DrConsultingManagement from "../doctorPanel/DrConsultingManagement";
import DrRecordManagement from "../doctorPanel/DrRecordManagement";
import ContainerDrawer from '../generalComponent/ContainerDrawer';

export default function SettingDr({onClick}) {
  const [active, setActive] = useState({ record: false, consulting: true });
  const changeActiveElem = (status) => {
    return classNames({
      "text-[#006ECF] border-b-[3px] border-b-[#006ECF]": status,
      "text-[#909090]": !status,
    });
  };
  return (
    <ContainerDrawer onClick={onClick} header={"تنظیمات"}>
      <div className="w-full mt-10 mx-auto flex flex-col gap-7 items-center">
          <DoctorInformation />
          <div className="w-full h-10 flex flex-row gap-5 vazir-medium px-5 border-b border-b-gray-200">
              <div onClick={() => setActive({ record: false, consulting: true })}
                className={`w-[95px] hover:cursor-pointer h-[40.2px] flex items-center justify-center text-[15px] 
                ${changeActiveElem(active.consulting)}`}>مدیریت مشاوره</div>
              <div onClick={() => setActive({ record: true, consulting: false })}
                className={`w-[95px] hover:cursor-pointer h-[40.2px] flex items-center justify-center text-[15px] 
                ${changeActiveElem(active.record)}`}>مدیریت ثبت</div>
          </div>
          <div className="w-[90%] h-max flex flex-col items-center gap-[18px] mb-20">
              {active.consulting ? (
                <DrConsultingManagement />
              ) : (
                <DrRecordManagement />
              )}
          </div>
      </div>
    </ContainerDrawer>
  );
}
