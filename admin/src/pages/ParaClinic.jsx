import { useState } from "react";
import PatientInfo from "../components/PatientInfo";
import RequestAndExplain from "../components/RequestAndExplain";
import SearchBoxFull from "../components/generalComponent/SearchBoxFull";
import SelectItem from "../components/generalComponent/SelectItem";
import TestHeader from "../components/generalComponent/HeaderTest";
import ParaClinicDr from "../components/paraClinic/ParaClinicDr";
import ParaClinicPC from "../components/paraClinic/ParaClinicPC";
import { useSelector } from "react-redux";
import ContainerDrawer from '../components/generalComponent/ContainerDrawer'
import { transformFormat } from "../../../frontend/src/services/func/transformFunc";

export default function ParaClinic({onClick, request}) {
  const [selectItem, setSelectItem] = useState("پزشک");
  const getSelectedItem = (item) => {
    setSelectItem(item);
  };
  const items = useSelector(state => state.actions.paraClinic);
  console.log(request)
  console.log(!request.hasOwnProperty('area'))
  return (
    <ContainerDrawer onClick={onClick} header={"پاراکلینیک"}>
        <div className="w-[90%] mt-10 mx-auto flex flex-col gap-5 items-center">
          <PatientInfo name={request.fullName} phoneNumber={transformFormat(request.phoneNumber)}
            time={request.time} date={request.date} nationalCode={transformFormat(request.nationalCode)} 
            insurance={request.insurance} />
          <RequestAndExplain typeRequest={request.service} explain={request.explain}
          titleRequest={`${!request.hasOwnProperty('area')? request.area.map(item => item): ""}`}/>
          
          <div className="w-full flex flex-row gap-[10px]">
            <SelectItem onClick={getSelectedItem} selectItem={selectItem}
              status={items.doctor.status} items={items.doctor.items} title={"پزشک"}/>

            <SelectItem onClick={getSelectedItem} selectItem={selectItem}
              status={items.paraClinic.status} items={items.paraClinic.items} title={"پاراکلنیک"}/>
          </div>
          <SearchBoxFull />
          <div className="w-full h-max flex flex-col gap-5 mb-6">
            {selectItem == "پزشک" ? <ParaClinicDr /> : <ParaClinicPC />}
          </div>
        </div>
    </ContainerDrawer>
  );
}
