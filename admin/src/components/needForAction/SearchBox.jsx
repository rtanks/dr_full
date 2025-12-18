import { useEffect, useState } from 'react';

export default function SearchBox({usersAll, getUsersFiltered}) {
    const [searchVal, setSearchVal] = useState(null);
    
    
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
            <div className='w-full sm:w-[1/3] relative'>
                <input onChange={(e) => setSearchVal(e.target.value)}  placeholder={"جستجو بیمار"}
                className="w-full h-10 px-5 outline-0 vazir-medium text-right rounded-[10px] bg-gray-200 text-[#676767] placeholder:text-[#676767]"/>
            </div>
        </>
    )
}