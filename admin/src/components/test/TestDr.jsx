import { useDispatch } from "react-redux";
import SelectedItem from "../generalComponent/SelectedItem";
import {changeCompleteStatus, changeDoneStatus, selectItemForAction} from "../../slices/actionsSlice";
import { useQuery } from "@tanstack/react-query";
import needForActionService from "../../services/api/dashboard.api/needForActionService";
import { useEffect, useState } from "react";
import SmallLoading from "../SmallLoading";

export default function TestDr() {
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([])

  const changeCompleteStatusDr = () => {
    dispatch(changeCompleteStatus({item: "test", role: "doctor"}))
  }
  const changeDoneStatusDr = (id) => {
      dispatch(changeDoneStatus({item: "test", role: "doctor", id: id}))
  }
  const selectItem = (id) => {
    dispatch(selectItemForAction({item: "test", role: "doctor", id: id}))
  }
  const {getDoctorsList}  =needForActionService();
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
          <SelectedItem key={dr?.id} id={dr?.id} item={"test"} role={"doctor"} title={dr?.fullName} text={dr?.specialties} 
            changeCompleteStatus={changeCompleteStatusDr} changeDoneStatus={() => changeDoneStatusDr(dr?.id)}
            selectItem={() => selectItem(dr?.id)}
          />
        ))
      }
    </>
  );
}
