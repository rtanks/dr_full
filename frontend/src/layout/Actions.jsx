import { useEffect, useState } from "react";
import HistoryTitle from "../components/history/HistoryTitle";
import HistoryDoctor from "../components/history/HistoryDoctor";
import HistoryParaClinic from "../components/history/HistoryParaClinic";
import CheckAuth from "../services/hook/CheckAuth";
import About from "../page/About";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import HeaderAuth from "../services/api/headerAndUrlService";
import axios from "axios";
import LoadingMini from "../components/LoadingMini";
import { checkExistRequestId } from "../services/func/getTypeRequest";
import {motion} from 'framer-motion'
import Loading from "../components/Loading";
import AudioDashboard from "../components/general/AudioDashboard";

export default function Actions({scrollHandler}) {
  const navigate = useNavigate();
  const {baseUrl, headers, id} = HeaderAuth();
  const {checkAuthUser} = CheckAuth();
  const queryClient = useQueryClient();
  const [histories, setHistories] = useState({doctor: [], paraClinic: []});
  const [selectHistoryItem, setSelectHistoryItem] = useState('paraClinic');
  const getSelectedHistoryItem = (value) => { setSelectHistoryItem(value); }

  const {data, isLoading, isPending} = useQuery({queryKey: ["historiesPara"], queryFn: async () => {
    const response = await axios.get(`${baseUrl}/requests/user/${id}`, {headers});
      console.log(response)
      return response.data;
  }, enabled: checkAuthUser()});

  const checkCategoryForSelectItem = (value) => {
    if(['doctorConsulting', 'hospital'].includes(value)) {
      return true;
    } else {
      return false;
    }
  }
    useEffect(() => {
        if(!isLoading && data) {
          if (!data.length) return;
          setHistories({
            doctor: data.filter(item => (item.category === 'doctorConsulting' || item.category === 'hospital')),
            paraClinic: data.filter(item => item.category == 'paraClinic')
          })
          if(location.pathname == '/') {
            console.log(location.pathname)
            if(checkCategoryForSelectItem(data[0]?.category)) {
              setSelectHistoryItem('doctor');
            } else {
              setSelectHistoryItem('paraClinic')
            }
            navigate(`/request/?id=${data[0]?._id}&category=${data[0]?.category}`)
          } else {
            const params = new URLSearchParams(location.search);
            console.log(params.get('id'), params.get('category'));
            if(params.get('category')) {
              if(checkCategoryForSelectItem(params.get('category'))) {
                setSelectHistoryItem('doctor');
              } else {
                setSelectHistoryItem('paraClinic');
              };
            } else {
              if(checkCategoryForSelectItem(data[0]?.category)) {
                setSelectHistoryItem('doctor');
              } else {
                setSelectHistoryItem('paraClinic')
              }
            }
          }
        }
      }, [data, location.pathname])
    const showHistoryItems = () => {
      return selectHistoryItem == 'doctor'?( 
        <HistoryDoctor history={histories.doctor} scrollHandler={scrollHandler}/>
      ) : (<HistoryParaClinic history={histories.paraClinic} scrollHandler={scrollHandler}/>); 
    }
    if(isLoading ) return <Loading/>
    return (
        <motion.section id="snap3" className='sm:w-[23%] w-full h-full shrink-0 rounded-2xl bg-transparent snap-end flex flex-col gap-4'
          animate={
                checkAuthUser() ? (
                        {border: '2px solid #fff0'}
                    ):(
                        {border: ['3px solid #fff', "3px solid #2C8073",'3px solid #fff', "3px solid #2C8073",'3px solid #fff', "3px solid #2C8073"],
                          transition: {duration: 3}
                        }
                    )
                }
        >
            <div className="w-full h-full shrink-0 bg-transparent rounded-2xl flex flex-col gap-2">
                  {
                    checkAuthUser() ? (
                      <>
                        <AudioDashboard/>
                        <div className="w-full h-[88%] shrink-0 bg-white rounded-2xl flex flex-col gap-2 p-1">
                          <HistoryTitle selectedHistory={selectHistoryItem} getSelectedHistory={getSelectedHistoryItem}/>
                          <div className="w-full h-[90%] bg-white rounded-2xl overflow-y-scroll">
                              {
                                showHistoryItems()
                              }
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full sm:h-full shrink-0 bg-white rounded-2xl flex flex-col gap-2 p-1">
                        <About/>
                      </div>
                    )
                  }
            </div>
        </motion.section>
    )
}
