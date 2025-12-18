import { useDispatch } from "react-redux";
import SelectedItem from "../generalComponent/SelectedItem";
import {changeCompleteStatus, changeDoneStatus, selectItemForAction} from "../../slices/actionsSlice";
import { useQuery } from "@tanstack/react-query";
import needForActionService from "../../services/api/dashboard.api/needForActionService";
import { useEffect } from "react";
import SmallLoading from "../SmallLoading";

export default function TestSample() {
  const dispatch = useDispatch();
  const changeCompleteStatusS = () => {
    dispatch(changeCompleteStatus({item: "test", role: "laboratory"}))
  }
  const changeDoneStatusS = (id) => {
      dispatch(changeDoneStatus({item: "test", role: "laboratory", id: id}))
  }
  const selectItem = (id) => {
    dispatch(selectItemForAction({item: "test", role: "sample", id: id}))
  }
  const {getSamplersList} = needForActionService();
  const {data, isLoading} = useQuery({queryKey: ["sampler"], queryFn: getSamplersList});
  useEffect(() => {
    console.log(data)
  }, [data])
  if(isLoading) return <SmallLoading/>
  return (
    <>
      <SelectedItem id={1} item={"test"} role={"sample"} title={"اشکان حسنوندی "} text={"کارشناس بیهوشی"} 
        changeCompleteStatus={changeCompleteStatusS} changeDoneStatus={() => changeDoneStatusS(1)}
        selectItem={() => selectItem(1)}
        />
      <SelectedItem id={2} item={"test"} role={"sample"} title={"مونا بیرانوند"} text={"کارشناس پرستاری"} 
        changeCompleteStatus={changeCompleteStatusS} changeDoneStatus={() => changeDoneStatusS(2)}
        selectItem={() => selectItem(2)}
        />
    </>
  );
}
