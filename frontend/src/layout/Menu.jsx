import { ImCommand } from "react-icons/im";
import { LuSearch, LuChartSpline, LuHeartPulse } from "react-icons/lu";
import icon from '../assets/logo.png'
import { RxDashboard } from "react-icons/rx";
import { FaUserDoctor, FaXRay } from "react-icons/fa6"; 
import { RxCalendar } from "react-icons/rx";
import { TbMessage2, TbCreditCardPay, TbDna2 } from "react-icons/tb";
import { CiViewList } from "react-icons/ci";
import { RiToothLine } from "react-icons/ri";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import MenuItem from '../components/menu/MenuItem';
import CheckAuth from '../services/hook/CheckAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileMenuContainer from '../components/menu/ProfileMenuContainer';
import SearchBox from "../components/general/SearchBox";

export default function Menu() {
    const {checkAuthUser, logout} = CheckAuth();
    const navigate = useNavigate();
    useEffect(() => {

    }, [])
    return (
        <section id='snap1' className='sm:w-[20%] w-[98%] h-full shrink-0 bg-white snap-start rounded-2xl p-2'>
            <ProfileMenuContainer />
            <div className="w-full h-[88%] bg-[#f1f1f1] rounded-2xl p-2">
                <div className='w-full h-max flex flex-col gap-0.5'>
                    {/* search box */}
                    <SearchBox placeholder={'جستجو در تی دا : سامانه آموزش و درمان کشور'} mStyle={'mb-2'}/>
                    <MenuItem path={'/mri'} title={'ثبت ام ار آی'}>
                        <RxDashboard size={20}/>
                    </MenuItem>
                    <MenuItem path={'/graph'} title={'ثبت گرافی'}>
                        <FaUserDoctor size={20}/>
                    </MenuItem>
                    <MenuItem path={'/ct-scan'} title={'ثبت سی تی اسکن'}>
                        <RxCalendar size={20}/>
                    </MenuItem>
                    <MenuItem path={'/ultrasound'} title={'ثبت سونوگرافی'}>
                        <TbMessage2 size={20}/>
                    </MenuItem>
                    <MenuItem path={'/strip-test'} title={'ثبت تست نواری'}>
                        <LuChartSpline size={20}/>
                    </MenuItem>
                    <MenuItem path={'/physiotherapy'} title={'ثبت فیزیو تراپی'}>
                        <LuChartSpline size={20}/>
                    </MenuItem>
                    <MenuItem path={'/test'} title={'ثبت آزمایش'}>
                        <LuChartSpline size={20}/>
                    </MenuItem>
                    <MenuItem path={'/medicine'} title={'ثبت دارو'}>
                        <LuChartSpline size={20}/>
                    </MenuItem>
                    <MenuItem path={'/transport'} title={'درخواست حمل و نقل بیمار'}>
                        <LuChartSpline size={20}/>
                    </MenuItem>
                </div>
                <div className='w-full h-max flex flex-col border-t border-[#bbb] pt-2 mt-2'>                    
                    {/* <div className='w-full h-max py-1'>دیگر منو</div> */}
                    <MenuItem path={'#'} title={'آموزش'}> 
                        <RiToothLine size={20}/>
                    </MenuItem>
                    <MenuItem path={'#'} title={'درباره ما'}>
                        <TbDna2 size={20}/>
                    </MenuItem>
                    <MenuItem path={'#'} title={'پشتیبانی'}>
                        <LuHeartPulse size={20}/>
                    </MenuItem>
                    <MenuItem path={'#'} title={'صندوق پیام'}>
                        <CiViewList size={20}/>
                    </MenuItem>
                    {
                        checkAuthUser() ? (
                            <MenuItem path={'#'} onClick={() => {navigate('/'); logout()}} title={'خروج'}>
                                <BiLogOut size={20}/>
                            </MenuItem> 
                        ) : (
                            ""
                        )
                    }
                </div>
            </div>
        </section>
    )
}