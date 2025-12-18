
import { useEffect, useState } from 'react';
import {shahr, ostan} from "iran-cities-json";
import SelectElem from './SelectElem';

export default function SearchBox({usersAll, getUsersFiltered}) {
    const [searchVal, setSearchVal] = useState(null);
    const [cities, setCities] = useState([]);
    const getCities = (name) => {
        getUsersFiltered(usersAll.filter(item => item?.province == name))
        const province = ostan.find(item => item.name == name);
        setCities(shahr.filter(city => city.ostan == province.id))
    }
    useEffect(() => {
        if(!(searchVal == '' || searchVal == null)) {
            console.log(searchVal)
            if(searchVal?.slice(0,2) == '09') {
                console.log("phone",usersAll.filter(item => item?.phoneNumber.includes(searchVal)))
                getUsersFiltered(usersAll.filter(item => item?.phoneNumber.includes(searchVal)))
            } else if(!isNaN(Number(searchVal))) {
                console.log("national",usersAll.filter(item => item?.nationalCode.includes(searchVal)))
                getUsersFiltered(usersAll.filter(item => item?.nationalCode.includes(searchVal)))
            } else {
                console.log("name",usersAll.filter(item => item?.fullName.includes(searchVal)))
                getUsersFiltered(usersAll.filter(item => item?.fullName.includes(searchVal)))
            }
        } else {
            getUsersFiltered(usersAll);
        }
    }, [searchVal])
    return (
        <>
            <span className="text-sm text-[#676767] w-max whitespace-nowrap">ارسال به</span>
            <SelectElem width={'w-1/3'} eventFunction={(e) => getCities(e.target.value)} firstValue={"استان"}>
              {
                ostan.map(province => <option key={province?.name} value={province?.name}>{province?.name}</option>)
              }
            </SelectElem>
            <SelectElem  width={'w-1/3'} eventFunction={(e) => getUsersFiltered(usersAll.filter(item => item?.city == e.target.value))}  firstValue={"شهر"}>
              {
                cities == null ? "" : cities.map(city => <option key={city?.name} value={city?.name}>{city?.name}</option>)
              }
            </SelectElem>
            <div className='w-full sm:w-[1/3] relative'>
                <input onChange={(e) => setSearchVal(e.target.value)}  placeholder={"جستجو بیمار"}
                className="w-full h-10 px-5 outline-0 vazir-medium text-right rounded-[10px] bg-gray-200 text-[#676767] placeholder:text-[#676767]"/>
            </div>
        </>
    )
}