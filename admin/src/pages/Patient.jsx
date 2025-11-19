import { useEffect, useState } from "react";
import SearchBoxWithBtn from "../components/generalComponent/SearchBoxWithBtn";
import { PiPlus } from "react-icons/pi";
import { CgMenuRight } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { changeToggleMenuStatus } from "../slices/statusMenuSlice";
import PatientItem from "../components/dashboard/PatientItem";
import CreatePayDoc from "../components/dashboard/CreatePayDoc";
import PatientEdit from "../components/dashboard/PatientEdit";
import PatientCreate from "../components/dashboard/PatientCreate";
import History from "../components/dashboard/History";
import { useQuery } from "@tanstack/react-query";
import patientService from "../services/api/dashboard.api/patientService";
import Loading from "../components/Loading";

export default function Patient() {
  const [itemSelected, setItemSelected] = useState({status: null, userSelected: {}});
  const getItemSelected = (item) => {
    setItemSelected(item)
  }
  const dispatch = useDispatch();
  const changeToggleStatus = () => {
    dispatch(changeToggleMenuStatus());
  };

  
  const {getPatient,getPatientHistory, getPatientSelected} = patientService()
  const {isLoading} = useQuery({queryKey: ['patients'], queryFn: getPatient})
  const patients = useSelector(state => state.admin.patients);

  const switchItems = () => {
    switch(itemSelected.status) {
      case "edit": return <PatientEdit patient={itemSelected.userSelected} onClick={() => setItemSelected({status:null, userSelected: {}})}/>
      case "pay": return <CreatePayDoc onClick={() => setItemSelected({status: null, userSelected: {}})}/>
      case "history": return <History getPatientHistory={getPatientHistory} onClick={() => setItemSelected({status:null, userSelected: {}})}/>
      case "create": return <PatientCreate onClick={() => setItemSelected({status:null, userSelected: {}})}/>
    }
  }

  if(isLoading) return <Loading/>
  return (
    <>
      {/* {
        itemSelected.status == null ? ( */}
          <>
            <SearchBoxWithBtn onClick1={() => changeToggleStatus()} onClick2={() => getItemSelected({status:"create", userSelected: {}})}>
              {{
                menu: <CgMenuRight size={24}/>,
                icon: <PiPlus size={24} />,
              }}
            </SearchBoxWithBtn>
            <div className="w-full h-max flex flex-col mt-5 gap-5 bg-transparent">
              <div className="w-full h-max flex flex-col gap-2">
                {
                  patients?.map((patient,index) => (
                    <PatientItem key={patient?._id} patient={patient} number={index + 1} getPatient={getPatientSelected} getItemSelected={getItemSelected}/>
                  ))
                }
              </div>
            </div>
          </>
        {/* ) : ( */}
          {switchItems()}
        {/* )
      } */}
    </>
  );
}
