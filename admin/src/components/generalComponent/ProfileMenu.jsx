import { BiDollar } from "react-icons/bi";
import {ProfileMenuItem, ProfileMenuItemWithoutAngle} from "./ProfileMenuItem";
import { PiPhoneCall } from "react-icons/pi";
import { LiaFileAlt } from "react-icons/lia";
import logo from "../../assets/images/logo.png"
import { LuLogOut } from "react-icons/lu";
import Wallet from "../Wallet";
import useSelectItem from "../../services/hooks/useSelectItem";

export default function ProfileMenu() {
    const {showItem, goBack, getItemSelected} = useSelectItem()
    const showItemSelected = () => {
        switch(showItem) {
            case "wallet": return <Wallet onClick={() => goBack()}/>
        }
    }
    return(
        <>
            {
                showItem != null ? (
                    showItemSelected()
                ) : (
                    <>
                        <div className="w-full h-max flex flex-col gap-5 mt-[30px]">
                            <ProfileMenuItem title={"کیف پول"} onClick={() => getItemSelected("wallet")}>
                                <BiDollar size={24}/>
                            </ProfileMenuItem>
                            <ProfileMenuItem title={"پشتیبانی"}>
                                <PiPhoneCall size={24}/>
                            </ProfileMenuItem>
                            <ProfileMenuItem title={"سوالات متداول"}>
                                <LiaFileAlt size={24}/>
                            </ProfileMenuItem>
                            <ProfileMenuItem title={"معرفی به دوستان"}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 3V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </ProfileMenuItem>
                            <ProfileMenuItem title={"قوانین و مقررات"}>
                                <img src={logo} className="w-[24px] h-[24px]"/>
                            </ProfileMenuItem>
                            <ProfileMenuItemWithoutAngle title={"خروج"}>
                                <LuLogOut size={24}/>
                            </ProfileMenuItemWithoutAngle>
                        </div>
                    </>
                )
            }
        </>
    )
}