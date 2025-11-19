import { useDispatch } from "react-redux";
import SelectedItem from "../generalComponent/SelectedItem";
import {selectItemForAction, changeCompleteStatus, changeDoneStatus} from "../../slices/actionsSlice";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import needForActionService from "../../services/api/dashboard.api/needForActionService";
import SmallLoading from "../SmallLoading";

export default function MedicineDr() {
  const dispatch = useDispatch();
  const changeCompleteStatusDr = () => {
    dispatch(changeCompleteStatus({item: "medicine", role: "doctor"}))
  }
  const changeDoneStatusDr = (id) => {
      dispatch(changeDoneStatus({item: "medicine", role: "doctor", id: id}))
  }
  const selectItem = (id) => {
    dispatch(selectItemForAction({item: "medicine", role: "doctor", id: id}))
  }
  const [doctors, setDoctors] = useState([])
  const {getDoctorsList} = needForActionService()
  const {data, isLoading} = useQuery({queryKey: ["doctorList"], queryFn: getDoctorsList});
  useEffect(() => {
    setDoctors(data?.data?.doctors)
    console.log(data)
  }, [data])
  if(isLoading) return <SmallLoading/>
  return (
    <>
      {
        doctors?.map(dr => (
          <SelectedItem key={dr?.id} item={"medicine"} role={"doctor"} id={dr?.id} title={dr?.fullName} text={dr?.specialties} 
            changeCompleteStatus={() => changeCompleteStatusDr()} 
            changeDoneStatus={() => changeDoneStatusDr(dr?.id)} 
            selectItem={() => selectItem(dr?.id)}
            />
        ))
      }
    </>
  );
}
