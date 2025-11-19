import { useDispatch } from "react-redux";
import SelectedItem from "../generalComponent/SelectedItem";
import {changeCompleteStatus, changeDoneStatus, selectItemForAction} from "../../slices/actionsSlice"
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import needForActionService from "../../services/api/dashboard.api/needForActionService";
import SmallLoading from "../SmallLoading";

export default function ParaClinicPC() {
  const dispatch = useDispatch();
  const changeCompleteStatusC = () => {
    dispatch(changeCompleteStatus({item: "paraClinic", role: "paraClinic"}))
  }
  const changeDoneStatusC = (id) => {
      dispatch(changeDoneStatus({item: "paraClinic", role: "paraClinic", id: id}))
  }
  const selectItem = (id) => {
    dispatch(selectItemForAction({item: "paraClinic", role: "paraClinic", id: id}))
  }
  const [paraClinic, setParaClinic] = useState([]);
  const {getServiceCentersList} = needForActionService()
  const {data, isLoading} = useQuery({queryKey: ["paraClinic"], queryFn: () => getServiceCentersList("paraclinic")})
  useEffect(() => {
    console.log(data)
  }, [data])
  if(isLoading) return <SmallLoading/>
  return (
    <>
      <SelectedItem id={1} item={"paraClinic"} role={"paraClinic"} 
        title={"مرکز تصویر برداری سپیدار"} text={"خیابان شریعتی - جنب پارک "} 
        changeCompleteStatus={changeCompleteStatusC} changeDoneStatus={() => changeDoneStatusC(1)} 
        selectItem={() => selectItem(1)}
      />
      
      <SelectedItem id={2} item={"paraClinic"} role={"paraClinic"} 
      title={"مرکز رادیولوژی میهن"} text={"خیابان شریعتی - جنب پارک "} 
      changeCompleteStatus={changeCompleteStatusC} changeDoneStatus={() => changeDoneStatusC(2)}
        selectItem={() => selectItem(2)}
      />
    </>
  );
}
