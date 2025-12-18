import { useEffect, useState } from "react";
import RecordDoctorItem from "../components/dashboard/RecordDoctorItem";
import SettingDr from "../components/dashboard/SettingDr";
import SearchBoxWithBtn from "../components/generalComponent/SearchBoxWithBtn";
import { PiPlus } from "react-icons/pi";
import { CgMenuRight } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { changeToggleMenuStatus } from "../slices/statusMenuSlice";
import UserDoctorEdit from "../components/dashboard/UserDoctorEdit";
import RecordDoctorUser from "../components/dashboard/RecordDoctorUser";
import recordDoctorService from "../services/api/dashboard.api/recordDoctorService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";

export default function RecordDoctor() {
  const {getDoctorsList} = recordDoctorService();
  const [itemSelected, setItemSelected] = useState({status:null, userSelected: {}});
  const getItemSelected = (item) => {
    setItemSelected(item)
  }
  const dispatch = useDispatch();
  const changeToggleStatus = () => {
    dispatch(changeToggleMenuStatus());
  };
  const doctors = useSelector(state => state.admin.doctors)
  const {data,isLoading} = useQuery({queryKey: ["doctors"], queryFn: getDoctorsList})
  useEffect(() => {
    console.log(data)
  },[data])
  if(isLoading) return <Loading/>
  const switchItems = () => {
    switch(itemSelected.status) {
      case "edit": return <UserDoctorEdit doctor={itemSelected.userSelected} onClick={() => setItemSelected({status:null, userSelected: {}})}/>
      case "record": return <RecordDoctorUser onClick={() => setItemSelected({status:null, userSelected: {}})}/>
      case "setting": return <SettingDr onClick={() => setItemSelected({status:null, userSelected: {}})}/>
    }
  }
  return (
    <>
      {/* {
        itemSelected.status == null ? ( */}
          <>
            <SearchBoxWithBtn onClick1={() => changeToggleStatus()} onClick2={() => getItemSelected({status: "record", userSelected:{}})}>
              {{
                menu: <CgMenuRight size={24}/>,
                icon: <PiPlus size={24} />,
              }}
            </SearchBoxWithBtn>
            <div className="w-full h-max flex flex-col mt-5 gap-5 bg-transparent">
              <div className="w-full h-max flex flex-col gap-2">
                {
                  data.data?.map((doctor,index) => (
                    <RecordDoctorItem key={doctor.id} doctor={doctor} number={index + 1} getItemSelected={getItemSelected}/>
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
