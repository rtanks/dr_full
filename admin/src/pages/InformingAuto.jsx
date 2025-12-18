import SearchBox from "../components/informing/SearchBox";
import HowSend from "../components/informing/HowSend";
import { useState } from "react";
import { useCities } from "../services/hooks/useCities";
import SelectElem from "../components/informing/SelectElem";
import {shahr, ostan} from "iran-cities-json";
import axios from "axios";
import headersAndUrlBaseService from "../services/api/headersAndUrlBaseService";
import {useForm} from 'react-hook-form';
import { AiOutlineCheck } from 'react-icons/ai';
export default function InformingAuto() {
    const {baseUrl, headers} = headersAndUrlBaseService()
    const [users, setUSers] = useState([]);
    const [cities, setCities] = useState([]);
    const {register, handleSubmit, setValue, reset} = useForm();
    const getCities = (name) => {
        setValue('province', name);
        const province = ostan.find(item => item.name == name);
        setCities(shahr.filter(city => city.ostan == province.id))
    }
    const getType = (val) => {
        setValue('type', val);
    } 
    const onSubmit = (data) => {
        console.log({...data, type: 'system'})
        axios.post(`${baseUrl}/message/create`, {...data, type: 'system'}, {headers}).then(res => {
            console.log(res.data)
            setUSers(res.data.users);
        }).catch(err => {
            console.log(err)
        })
        reset()
    }
    return (
        <>
           <div className="w-full h-max flex flex-col gap-5 bg-transparent vazir-medium">
              <div className="w-full h-max flex flex-col gap-2">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full h-max flex flex-col gap-4">
                    <div className="w-max flex flex-row items-center gap-3 mt-4">
                        <span className="text-sm text-[#676767] w-max whitespace-nowrap">ارسال به</span>
                        <SelectElem register={register("province")} width={'w-1/3'} eventFunction={(e) => getCities(e.target.value)} firstValue={"استان"}>
                          {
                            ostan.map(province => <option key={province?.name} value={province?.name}>{province?.name}</option>)
                          }
                        </SelectElem>
                        <SelectElem register={register('city')} width={'w-1/3'} eventFunction={(e) => setValue('city', e.target.value)}  firstValue={"شهر"}>
                          {
                            cities == null ? "" : cities.map(city => <option key={city?.name} value={city?.name}>{city?.name}</option>)
                          }
                        </SelectElem>
                        <SearchBox placeholder={"جستجو بیمار"}/>
                    </div>
                    <div className="w-full h-max flex flex-col sm:flex-row sm:items-center gap-2">
                        <div className="w-max flex flex-row items-center gap-3">
                            <span className="text-sm text-[#676767] w-max whitespace-nowrap">ارسال با</span>
                            <HowSend getType={getType}/>
                        </div>
                        <input {...register("title")} className="border border-[#aaa] h-10 rounded-lg px-2 w-full sm:w-[37.2%]" placeholder="سر فصل:"/>
                        <input {...register("link")} className="border border-[#aaa] h-10 rounded-lg px-2 w-full sm:w-[37.2%]" placeholder="رفتن به"/>
                    </div>
                    <div className="w-full flex flex-row items-center gap-2">
                    <AiOutlineCheck size={24} className="border h-9 w-7" />
                    <input {...register('text')} className="border border-[#aaa] h-10 rounded-lg px-2 w-full" placeholder="متن پیام:"/>     

                    <button type="submit" className="bg-gray-200 w-1/4 mr-auto">ارسال</button>              
                    </div>
                </form>
                <div className="w-full h-max py-5 flex flex-col gap-2">
                    {
                        users.length != 0 ? (
                            users.map(user => (
                                <div key={user._id} className="bg-white w-full flex flex-row items-center gap-10">
                                    <div className="w-max flex flex-row items-center gap-1">
                                        <span>{user.fullName}</span> / 
                                        <span>{user.nationalCode}</span>
                                    </div>
                                    <div className="w-max flex flex-row items-center gap-1">
                                        <span>{user.province}</span> / 
                                        <span>{user.city}</span>
                                    </div>
                                    
                                </div>
                            ))
                        ) : ("")
                    }
                </div>
              </div>
            </div> 
        </>
    )
}