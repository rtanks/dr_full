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
  const {data, isLoading, isPending} = useQuery({queryKey: ["doctors"], queryFn: getDoctorsList});
  useEffect(() => {
    if(!isPending) {
      console.log(data)
      setDoctors(data?.data);
    }
  }, [data])
  if(isLoading) return <SmallLoading/>
  return (
    <>
      {
        doctors?.map(dr => (
          <SelectedItem key={dr._id} id={dr._id} item={"paraClinic"} role={"doctor"} title={dr?.fullName} 
          text={dr.specialty} changeCompleteStatus={() => changeCompleteStatusDr()} 
          changeDoneStatus={() => changeDoneStatusDr(dr?._id)} 
          selectItem={() => selectItem(dr?._id)}
          />
        ))
      }
    </>
  );
}
