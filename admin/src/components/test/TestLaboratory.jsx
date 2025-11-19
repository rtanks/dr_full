import { useDispatch, useSelector } from "react-redux";
import SelectedItem from "../generalComponent/SelectedItem";
import {changeCompleteStatus, changeDoneStatus, selectItemForAction} from "../../slices/actionsSlice";
import needForActionService from "../../services/api/dashboard.api/needForActionService";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SmallLoading from "../SmallLoading";

export default function TestLaboratory() {
  const dispatch = useDispatch();
  const changeCompleteStatusL = () => {
    dispatch(changeCompleteStatus({item: "test", role: "laboratory"}))
  }
  const changeDoneStatusL = (id) => {
      dispatch(changeDoneStatus({item: "test", role: "laboratory", id: id}))
  }
  const selectItem = (id) => {
    dispatch(selectItemForAction({item: "test", role: "laboratory", id: id}))
  }
  
  const [laboratory, setLaboratory] = useState([])
  const {getServiceCentersList} = needForActionService()
  const {data, isLoading} = useQuery({queryKey: ["laboratory"], queryFn: () => getServiceCentersList("lab")});
  useEffect(() => {
    // setLaboratory(data?.data?.doctors)
    console.log(data)
  }, [data])
  if(isLoading) return <SmallLoading/>
  return (
    <>
      <SelectedItem id={1} item={"test"} role={"laboratory"} title={"آزمایشگاه نور"}
        text={"خیابان شریعتی - جنب پارک "} changeCompleteStatus={changeCompleteStatusL} 
        changeDoneStatus={() => changeDoneStatusL(1)} selectItem={() => selectItem(1)}/>

      <SelectedItem id={2} item={"test"} role={"laboratory"} title={"آزمایشگاه پاستور"} do
        text={"خیابان شریعتی - جنب پارک "} changeCompleteStatus={changeCompleteStatusL} 
        changeDoneStatus={() => changeDoneStatusL(2)} selectItem={() => selectItem(2)}/>
    </>
  );
}
