import ProfileMenuContainer from '../components/menu/ProfileMenuContainer';
import MenuItem from '../components/menu/MenuItem';
import CheckAuth from '../services/hook/CheckAuth';
import SearchBox from "../components/general/SearchBox";
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import { MdOutlineMessage, MdOutlineSupportAgent } from "react-icons/md";
import { AboutIcon, CtScanIcon, DoctorICon, EducationIcon, GraphIcon, MedicineIcon, MriIcon, PhysiotherapyIcon, StripTestIcon, TestIcon, TransportIcon, UltrasoundIcon } from './Icons';
import QrCode from '../components/menu/QrCode';
import { HiOutlineUserCircle } from "react-icons/hi2";
import { TbCalendarClock } from "react-icons/tb";

export default function Menu({scrollHandler, changeActiveSnap}) {
    const {checkAuthUser, logout} = CheckAuth();
    const navigate = useNavigate();
    const goToCenterItem = () => {
        if(window.matchMedia("(max-width: 768px)").matches) {
            scrollHandler(2);
            changeActiveSnap(2);
        }
    }
    const goLastItem = () => {
        if(window.matchMedia("(max-width: 768px)").matches) {
            scrollHandler(3);
            changeActiveSnap(3);
        }
    }
    return (
        <section id='snap1' className='sm:w-[20%] w-full h-full shrink-0 bg-white snap-start rounded-2xl p-2'>
            <ProfileMenuContainer />
            <div className="w-full h-[88%] bg-[#f1f1f1] rounded-2xl py-4 px-3 overflow-y-scroll">
                <div className='w-full h-max flex flex-col'>
                    {/* search box */}
                    <SearchBox placeholder={'جستجو در تی دا : سامانه آموزش و درمان کشور'} mStyle={'mb-2'}/>
                    <MenuItem path={'/triage'} title={'تریاژ (تشخیص و مشاوره)'}>
                        <MriIcon/>
                    </MenuItem>
                    <MenuItem path={'/visit-doctor'} onClick={goToCenterItem} title={'ویزیت پزشک'}>
                        <DoctorICon/>
                    </MenuItem>
                    <MenuItem path={'/mri'} onClick={goToCenterItem} title={'ثبت ام ار آی'}>
                        <MriIcon/>
                    </MenuItem>
                    <MenuItem path={'/graph'} onClick={goToCenterItem} title={'ثبت گرافی'}>
                        <GraphIcon/>
                    </MenuItem>
                    <MenuItem path={'/ct-scan'} onClick={goToCenterItem} title={'ثبت سی تی اسکن'}>
                        <CtScanIcon/>
                    </MenuItem>
                    <MenuItem path={'/ultrasound'} onClick={goToCenterItem} title={'ثبت سونوگرافی'}>
                        <UltrasoundIcon/>
                    </MenuItem>
                    <MenuItem path={'/strip-test'} onClick={goToCenterItem} title={'ثبت تست نواری'}>
                        <StripTestIcon/>
                    </MenuItem>
                    <MenuItem path={'/physiotherapy'} onClick={goToCenterItem} title={'ثبت فیزیو تراپی'}>
                        <PhysiotherapyIcon/>
                    </MenuItem>
                    <MenuItem path={'/test'} onClick={goToCenterItem} title={'ثبت آزمایش'}>
                        <TestIcon/>
                    </MenuItem>
                    <MenuItem path={'/medicine'} onClick={goToCenterItem} title={'ثبت دارو'}>
                        <MedicineIcon/>
                    </MenuItem>
                    <MenuItem path={'/transport'} onClick={goToCenterItem} title={'درخواست حمل و نقل بیمار'}>
                        <TransportIcon/>
                    </MenuItem>
                    <MenuItem path={'#'} onClick={goToCenterItem} title={'ثبت نوبت خدمات پاراکلنیک'}>
                        <TbCalendarClock/>
                    </MenuItem>
                </div>
                <div className='w-full h-max flex flex-col gap-0 border-t border-[#bbb] pt-2 mt-2'>
                    <MenuItem path={checkAuthUser()? "/about":'#'} onClick={() => {
                        if(checkAuthUser()) {
                            goToCenterItem();
                        } else {
                            goLastItem();
                        }
                    }} title={'درباره ما'}>
                        <AboutIcon/>
                    </MenuItem>
                    <MenuItem path={'/support'} onClick={goToCenterItem} title={'سوالات متداول / پشتیبانی'}>
                        <MdOutlineSupportAgent/>
                    </MenuItem>
                    <MenuItem path={'/message-box'} onClick={goToCenterItem} title={'صندوق پیام'}>
                        <MdOutlineMessage/>
                    </MenuItem>
                    {
                        checkAuthUser() ? (
                            <>
                                <MenuItem path={'/profile'} onClick={goToCenterItem} title={'پروفایل'}> 
                                    <HiOutlineUserCircle size={21}/>
                                </MenuItem>
                                <QrCode/>
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