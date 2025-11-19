import { useDispatch } from "react-redux";
import SelectedItem from "../generalComponent/SelectedItem";
import {changeCompleteStatus, changeDoneStatus, selectItemForAction} from "../../slices/actionsSlice";
import needForActionService from "../../services/api/dashboard.api/needForActionService";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SmallLoading from "../SmallLoading";

export default function Courier() {
  const dispatch = useDispatch();
  const changeCompleteStatusC = () => {
    dispatch(changeCompleteStatus({item: "medicine", role: "courier"}))
  }
  const changeDoneStatusC = (id) => {
      dispatch(changeDoneStatus({item: "medicine", role: "courier", id: id}))
  }
  const selectItem = (id) => {
    dispatch(selectItemForAction({item: "medicine", role: "courier", id: id}))
  }
  const [couriers, setCouriers] = useState([])
  const {getCouriersList} = needForActionService()
  const {data, isLoading} = useQuery({queryKey: ["couriers"], queryFn: getCouriersList});
  useEffect(() => {
    
    console.log(data)
  }, [data])
  if(isLoading) return <SmallLoading/>
  return (
    <>
      <SelectedItem
        id={1} 
        item={"medicine"}
        role={"courier"}
        title={"اشکان حسنوندی "}
        text={"کارشناس بیهوشی"}
        changeCompleteStatus={changeCompleteStatusC} 
        changeDoneStatus={() => changeDoneStatusC(1)}
        selectItem={() => selectItem(1)}
      />
      <SelectedItem
        id={2} 
        item={"medicine"}
        role={"courier"}
        title={"مونا بیرانوند"}
        text={"کارشناس پرستاری"}
        changeCompleteStatus={changeCompleteStatusC} 
        changeDoneStatus={() => changeDoneStatusC(2)}
        selectItem={() => selectItem(2)}
      />
    </>
  );
}
