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

export default function ParaClinic({onClick}) {
  const [selectItem, setSelectItem] = useState("پزشک");
  const getSelectedItem = (item) => {
    setSelectItem(item);
  };
  const items = useSelector(state => state.actions.paraClinic);

  return (
    <ContainerDrawer onClick={onClick} header={"پاراکلینیک"}>
        <div className="w-[90%] mt-10 mx-auto flex flex-col gap-5 items-center">
          <PatientInfo name={"اشکان حسنوندی"} phoneNumber={"09216919291"}
            time={"14:45"} date={"1404/12/01"} nationalCode={"4060405531"} insurance={"آزاد"} />
          <RequestAndExplain typeRequest={"گرافی"} titleRequest={"کف دست راست - مچ دست راست "}/>
          
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
