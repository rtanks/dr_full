import ProfileMenuContainer from '../components/menu/ProfileMenuContainer';
import MenuItem from '../components/menu/MenuItem';
import CheckAuth from '../services/hook/CheckAuth';
import SearchBox from "../components/general/SearchBox";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuChartSpline } from "react-icons/lu";
import { FaXRay } from "react-icons/fa6"; 
import { TbMessage2 } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineQrCode2, MdOutlineMessage, MdOutlineSupportAgent, MdOutlineInfo  } from "react-icons/md";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { RiMedicineBottleLine } from "react-icons/ri";
import { GrTest } from "react-icons/gr";
import { MriIcon } from './Icons';

export default function Menu() {
    const {checkAuthUser, logout} = CheckAuth();
    const navigate = useNavigate();
    useEffect(() => {

    }, [])
    return (
        <section id='snap1' className='sm:w-[20%] w-[98%] h-full shrink-0 bg-white snap-start rounded-2xl p-2'>
            <ProfileMenuContainer />
            <div className="w-full h-[88%] bg-[#f1f1f1] rounded-2xl p-2 overflow-y-scroll">
                <div className='w-full h-max flex flex-col'>
                    {/* search box */}
                    <SearchBox placeholder={'جستجو در تی دا : سامانه آموزش و درمان کشور'} mStyle={'mb-2'}/>
                    <MenuItem path={'/mri'} title={'ثبت ام ار آی'}>
                        <MriIcon/>
                    </MenuItem>
                    <MenuItem path={'/graph'} title={'ثبت گرافی'}>
                        <FaXRay/>
                    </MenuItem>
                    <MenuItem path={'/ct-scan'} title={'ثبت سی تی اسکن'}>
                        <MriIcon/>
                    </MenuItem>
                    <MenuItem path={'/ultrasound'} title={'ثبت سونوگرافی'}>
                        <TbMessage2/>
                    </MenuItem>
                    <MenuItem path={'/strip-test'} title={'ثبت تست نواری'}>
                        <LuChartSpline/>
                    </MenuItem>
                    <MenuItem path={'/physiotherapy'} title={'ثبت فیزیو تراپی'}>
                        <LuChartSpline/>
                    </MenuItem>
                    <MenuItem path={'/test'} title={'ثبت آزمایش'}>
                        <GrTest/>
                    </MenuItem>
                    <MenuItem path={'/medicine'} title={'ثبت دارو'}>
                        <RiMedicineBottleLine/>
                    </MenuItem>
                    <MenuItem path={'/transport'} title={'درخواست حمل و نقل بیمار'}>
                        <LuChartSpline/>
                    </MenuItem>
                </div>
                <div className='w-full h-max flex flex-col gap-0 border-t border-[#bbb] pt-2 mt-2'>
                    <MenuItem path={'#'} title={'آموزش'}> 
                        <LiaChalkboardTeacherSolid size={21}/>
                    </MenuItem>
                    <MenuItem path={'#'} title={'درباره ما'}>
                        <MdOutlineInfo/>
                    </MenuItem>
                    <MenuItem path={'#'} title={'پشتیبانی'}>
                        <MdOutlineSupportAgent/>
                    </MenuItem>
                    <MenuItem path={'#'} title={'صندوق پیام'}>
                        <MdOutlineMessage/>
                    </MenuItem>
                    {
                        checkAuthUser() ? (
                            <>
                                <MenuItem path={'#'} onClick={() => {navigate('/'); logout()}} title={'خروج'}>
                                    <BiLogOut/>
                                </MenuItem> 
                                <MenuItem path={checkAuthUser() ? '/qrcode': '#'} title={'کیوآرکد'}>
                                    <MdOutlineQrCode2/>
                                </MenuItem>
                            </>
                        ) : (
                            ""
                        )
                    }
                </div>
            </div>
        </section>
    )
}