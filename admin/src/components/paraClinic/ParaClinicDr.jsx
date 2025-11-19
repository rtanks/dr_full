import { useDispatch } from "react-redux";
import SelectedItem from "../generalComponent/SelectedItem";
import {changeCompleteStatus, changeDoneStatus, selectItemForAction} from "../../slices/actionsSlice";
import { useEffect, useState } from "react";
import needForActionService from "../../services/api/dashboard.api/needForActionService";
import { useQuery } from "@tanstack/react-query";
import SmallLoading from "../SmallLoading";

export default function ParaClinicDr() {
  const dispatch = useDispatch();
  const changeCompleteStatusDr = () => {
    dispatch(changeCompleteStatus({item: "paraClinic", role: "doctor"}))
  }
  const changeDoneStatusDr = (id) => {
      dispatch(changeDoneStatus({item: "paraClinic", role: "doctor", id: id}))
  }
  const selectItem = (id) => {
    dispatch(selectItemForAction({item: "paraClinic", role: "doctor", id: id}))
  }

  const [doctors, setDoctors] = useState([]);
  const {getDoctorsList} = needForActionService();
  const {data, isLoading} = useQuery({queryKey: ["doctors"], queryFn: getDoctorsList});
  useEffect(() => {
    setDoctors(data?.data?.doctors);
    console.log(data)
  }, [data])
  if(isLoading) return <SmallLoading/>
  return (
    <>
      {
        doctors?.map(dr => (
          <SelectedItem key={dr?.id} id={dr?.id} item={"paraClinic"} role={"doctor"} title={dr?.fullName} 
          text={dr?.specialties} changeCompleteStatus={() => changeCompleteStatusDr()} 
          changeDoneStatus={() => changeDoneStatusDr(dr?.id)} 
          selectItem={() => selectItem(dr?.id)}
          />
        ))
      }
    </>
  );
}
