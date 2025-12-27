import ProfileMeu from "./ProfileMenu";
import icon from '../../assets/logo.png'
import CheckAuth from "../../services/hook/CheckAuth";
import ProfileMeuNotLogin from "./ProfileMenuNotLogin";

export default function ProfileMenuContainer() {
    const { checkAuthUser } = CheckAuth()
    
    return (
        <div className="w-full h-16 sm:h-[12%] px-3">
            {
                checkAuthUser() ? (
                    <ProfileMeu/>
                ) : (
                    <ProfileMeuNotLogin/>
                )
            }
        </div>
    )
}