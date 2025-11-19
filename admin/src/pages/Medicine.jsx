import { useState } from "react";
import PatientInfo from "../components/PatientInfo";
import RequestAndExplain from "../components/RequestAndExplain";
import SearchBoxFull from "../components/generalComponent/SearchBoxFull";
import SelectItem from "../components/generalComponent/SelectItem";
import TestHeader from "../components/generalComponent/HeaderTest";
import MedicineDr from "../components/medicine/MedicineDr";
import Drugstore from "../components/medicine/Drugstore";
import Courier from "../components/medicine/Courier";
import MedicineInterPretation from "../components/medicine/MedicineInterpretation";
import { useSelector } from "react-redux";
import ContainerDrawer from "../components/generalComponent/ContainerDrawer"

export default function Medicine({onClick}) {
  const [selectItem, setSelectItem] = useState("پزشک");
  const getSelectedItem = (item) => {
    setSelectItem(item);
  };
 const items = useSelector(state => state.actions.medicine);
  const showItemSelected = () => {
    switch (selectItem) {
      case "پزشک":
        return <MedicineDr/>;
      case "داروخانه":
        return <Drugstore/>;
      case "پیک":
        return <Courier/>;
      case "تفسیر":
        return <MedicineInterPretation/>;
    }
  };

  return (
    <ContainerDrawer onClick={onClick} header={"دارو"}>
        <div className="w-[90%] mt-10 mx-auto flex flex-col gap-5 items-center">
          <PatientInfo name={"اشکان حسنوندی"} phoneNumber={"09216919291"}
            time={"14:45"} date={"1404/12/01"} nationalCode={"4060405531"} insurance={"آزاد"}/>
          <RequestAndExplain typeRequest={"آزمایش"}
            titleRequest={"شربت مترونیدازول 500 میلی گرم - آمپول جنتامایشین 300"}/>

          <div className="w-full h-max mx-auto flex flex-col gap-5">
            <div className="w-full flex flex-row gap-[8px] overflow-x-scroll ">
              <SelectItem onClick={getSelectedItem} selectItem={selectItem}
                status={items.doctor.status} items={items.doctor.items}
                title={"پزشک"}/>
              <SelectItem onClick={getSelectedItem} selectItem={selectItem}
                status={items.drugstore.status} items={items.drugstore.items}
                title={"داروخانه"}/>
              <SelectItem onClick={getSelectedItem} selectItem={selectItem}
                status={items.courier.status} items={items.courier.items}
                title={"پیک"} />
              <SelectItem status={items.interpretation.status} items={items.interpretation.items}
                title={"تفسیر"} />
              {/* <SelectItem onClick={getSelectedItem} selectItem={selectItem}
                status={items.interpretation.status} items={items.interpretation.items}
                title={"تفسیر"} /> */}
            </div>
            <SearchBoxFull />
          </div>
          <div className="w-full h-max flex flex-col gap-5 mb-6">
              {showItemSelected()}
          </div>
        </div>
    </ContainerDrawer>
  );
}
