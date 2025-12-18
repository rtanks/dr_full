import { useEffect, useState } from "react";
import {IoAlertCircleOutline, IoNotificationsOutline, IoSettingsOutline} from 'react-icons/io5'
import {LiaAngleDownSolid } from 'react-icons/lia'
import HistoryTitle from "../components/history/HistoryTitle";
import HistoryDoctor from "../components/history/HistoryDoctor";
import HistoryParaClinic from "../components/history/HistoryParaClinic";
import CheckAuth from "../services/hook/CheckAuth";
import About from "../page/About";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HeaderAuth from "../services/api/headerAndUrlService";
import axios from "axios";
import LoadingMini from "../components/LoadingMini";
import { checkExistRequestId } from "../services/func/getTypeRequest";
import {motion} from 'framer-motion'

export default function Actions() {
    const [histories, setHistories] = useState({doctor: [], paraClinic: []});
    const {checkAuthUser} = CheckAuth();
    const {baseUrl, headers, id} = HeaderAuth();
    const [selectHistoryItem, setSelectHistoryItem] = useState('paraClinic');
    const getSelectedHistoryItem = (value) => {
      setSelectHistoryItem(value);
    }
    const {data, isLoading, isPending} = useQuery({queryKey: ["historiesPara"], queryFn: async () => {
      const response = await axios.get(`${baseUrl}/requests/user/${id}`, {headers});
        console.log(response)
        return response.data;
    }, enabled: checkAuthUser()});
    const navigate = useNavigate();
    useEffect(() => {
        if(!isPending) {
          console.log(data);
          console.log(data[0]?.category);
          if(data){
            setHistories({
              doctor: data.filter(item => (item.category == 'doctorConsulting' || item.category == 'hospital')),
              paraClinic: data.filter(item => item.category == 'paraClinic')
            })
          //   if(location.pathname == '/') {
          //     if(data[0]?.category == 'doctorConsulting' || data[0]?.category == 'hospital') {
          //       setSelectHistoryItem('doctor');
          //     } else {
          //       setSelectHistoryItem('paraClinic')
          //     }
          //     navigate(`/request/${data[0]?._id}`)
          //   } else {
          //     if(!checkExistRequestId()) {
          //       if(data[0]?.category == 'doctorConsulting' || data[0]?.category == 'hospital') {
          //         setSelectHistoryItem('doctor');
          //       } else {
          //         setSelectHistoryItem('paraClinic')
          //       }
          //     }
          //   }
          }
        }
      }, [data])
    const showHistoryItems = () => {
      return selectHistoryItem == 'doctor'? <HistoryDoctor history={histories.doctor}/> : <HistoryParaClinic history={histories.paraClinic}/>; 
    }
    if(isLoading ) return <LoadingMini/>
    return (
        <motion.section id="snap3" className='sm:w-[23%] w-full h-full shrink-0 rounded-2xl bg-transparent snap-end flex flex-col gap-4'
          animate={
                checkAuthUser() ? (
                        {border: '2px solid #fff'}
                    ):(
                        {border: ['3px solid #fff', "3px solid #2C8073",'3px solid #fff', "3px solid #2C8073",'3px solid #fff', "3px solid #2C8073"],
                          transition: {duration: 3}
                        }
                    )
                }
        >
            <div className="w-full h-full sm:h-full shrink-0 bg-white rounded-2xl flex flex-col gap-2 p-1">
                  {
                    checkAuthUser() ? (
                      <>
                        <HistoryTitle selectedHistory={selectHistoryItem} getSelectedHistory={getSelectedHistoryItem}/>
                        <div className="w-full h-[90%] bg-white rounded-2xl overflow-y-scroll">
                            {
                              showHistoryItems()
                            }
                        </div>
                      </>
                    ) : (
                      <About/>
                    )
                  }
            </div>
        </motion.section>
    )
}

// {/* <div className="w-full h-[7%] hidden sm:flex flex-col">
//     <div className='w-full h-full shrink-0 snap-end flex flex-row-reverse gap-2 sm:gap-5 items-center'>
//         <div className='w-max h-max flex flex-row-reverse gap-1 sm:gap-3 text-sm pr-2 sm:pr-5 relative after:contents-[""] after:absolute after:right-0 after:top-2 after:w-px after:h-4/6 after:bg-[#bbb]'>
//           <button className='w-24 sm:w-28 h-[43px] bg-main text-white rounded-xl flex flex-row items-center justify-center gap-1 sm:gap-2'>
//             <IoAlertCircleOutline size={22}/>
//             <span>آموزش</span>
//           </button>
//           <button className='w-24 sm:w-28 h-[43px] flex flex-row items-center justify-center gap-1 sm:gap-2 text-[#2C8073] border-2 border-[#2C8073] bg-transparent rounded-xl'>
//             <span className='pb-1.5 w-14'></span>
//             <LiaAngleDownSolid size={16}/>
//           </button>
//         </div>
//         <div className='w-max h-max flex flex-row items-center justify-center gap-2 sm:gap-5'>
//           <IoSettingsOutline size={24}/>
//           <IoNotificationsOutline size={24}/>
//         </div>
//     </div>
// </div> */}