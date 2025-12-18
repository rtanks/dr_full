import UserItem from "../components/dashboard/UserItem";
import Medicine from "./Medicine";
import ParaClinic from "./ParaClinic";
import TestRequest from "./TestRequest";
import Triage from "./Triage";
import { useEffect, useState } from "react";
import SearchBoxWithBtn from "../components/generalComponent/SearchBoxWithBtn";
import { PiPlus } from "react-icons/pi";
import { CgMenuRight } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { changeToggleMenuStatus } from "../slices/statusMenuSlice";
import needForActionService from "../services/api/dashboard.api/needForActionService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import Transportation from "./Transportation";
import headersAndUrlBaseService from "../services/api/headersAndUrlBaseService";
import axios from 'axios';
import { convertDateToLocalFormat } from "../services/func/transformDate";
import CreateNeedForAction from "../components/needForAction/CreateNeedForAction";

export default function NeedForAction() {
  const [itemSelected, setItemSelected] = useState(null);
  const [actionSelected, setActionSelected] = useState({});
  const [mainData, setMainData] = useState([]);
  const dispatch = useDispatch();
    const changeToggleStatus = () => {
      dispatch(changeToggleMenuStatus());
    };
  const getItemSelected = (item) => {
    setItemSelected(item)
  }
  // const {getMainInfo} = needForActionService();
  const { baseUrl, headers } = headersAndUrlBaseService();
  const {data, isLoading, isPending} = useQuery({queryKey: ["users"], queryFn: async () => {
      const response = await axios.get(`${baseUrl}/admin/need-for-action/`, {headers});
      console.log(response.data);
      return response.data;
  }});
  const [userAndRequestData, setUserAndRequestData] = useState({});
  const getUserAndRequestData = (data) => {
    setUserAndRequestData(data)
  }
  const switchItems = () => {
    switch(itemSelected) {
      case "triage": return <Triage onClick={() => setItemSelected(null)}/>
      case "test": return <TestRequest onClick={() => setItemSelected(null)}/>
      case "medicine": return <Medicine onClick={() => setItemSelected(null)}/>
      case "paraClinic": return <ParaClinic request={userAndRequestData} onClick={() => setItemSelected(null)}/>
      case "transportation": return <Transportation onClick={() => setItemSelected(null)}/>
      case "create": return <CreateNeedForAction onClick={() => setItemSelected(null)}/>
    }
  }
  
  useEffect(() => {
    if(!isPending) {
      console.log(data)
      setMainData(data)
    }
  }, [data])
  if(isLoading) return <Loading/>
  return (
    <>
      {/* {
        itemSelected == null ? ( */}
          <>
            <SearchBoxWithBtn onClick2={() => setItemSelected('create')} onClick1={() => changeToggleStatus()}>
              {{
                menu: <CgMenuRight size={24}/>,
                icon: <PiPlus size={24} />,
              }}
            </SearchBoxWithBtn>
            <div className="w-full h-max flex flex-col mt-5 gap-5 bg-transparent">
              <div className="w-full h-max flex flex-col gap-2">
                {
                  !isPending ? (
                    data.map((item, index) => (
                      <UserItem key={index} request={item.request} user={item.user} onClick={getUserAndRequestData}
                      time={convertDateToLocalFormat(item.request.createdAt).time} date={convertDateToLocalFormat(item.request.createdAt).dateValue}
                        style={"border-b md:border-0 border-b-[#e0e0e0]"} getItemSelected={getItemSelected}/>
                    ))
                  ) : (
                    ""
                  )
                }
                {/* <UserItem name={"اشکان حسنوندی"} number={"6251478"} time={"14:45"} date={"1404/12/01"}
                  style={"border-b md:border-0 border-b-[#e0e0e0]"} getItemSelected={getItemSelected} /> */}
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
