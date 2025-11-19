import { useDispatch } from "react-redux";
import SelectedItem from "../generalComponent/SelectedItem";
import {changeCompleteStatus, changeDoneStatus, selectItemForAction} from "../../slices/actionsSlice";
import { useEffect } from "react";
import needForActionService from "../../services/api/dashboard.api/needForActionService";
import { useQuery } from "@tanstack/react-query";
import SmallLoading from "../SmallLoading";

export default function Drugstore() {
  const dispatch = useDispatch();
  const changeCompleteStatusD = () => {
    dispatch(changeCompleteStatus({item: "medicine", role: "drugstore"}))
  }
  const changeDoneStatusD = (id) => {
      dispatch(changeDoneStatus({item: "medicine", role: "drugstore", id: id}))
  }
  const selectItem = (id) => {
    dispatch(selectItemForAction({item: "medicine", role: "drugstore", id: id}))
  }
  const {getServiceCentersList} = needForActionService()
  const {data, isLoading} = useQuery({queryKey: ["laboratory"], queryFn: () => getServiceCentersList("pharmacy")});
  useEffect(() => {
    console.log(data)
  }, [data])
  if(isLoading) return <SmallLoading/>
  return (
    <>
      <SelectedItem
        id={1}
        item="medicine" 
        role="drugstore"
        title={"آزمایشگاه نور"}
        text={"خیابان شریعتی - جنب پارک "}
        changeCompleteStatus={changeCompleteStatusD} 
        changeDoneStatus={() => changeDoneStatusD(1)}
        selectItem={() => selectItem(1)}
      />
      <SelectedItem
        id={2}
        item="medicine" 
        role="drugstore"
        title={"آزمایشگاه پاستور"}
        text={"خیابان شریعتی - جنب پارک "}
        changeCompleteStatus={changeCompleteStatusD} 
        changeDoneStatus={() => changeDoneStatusD(2)}
        selectItem={() => selectItem(2)}
      />
    </>
  );
}
