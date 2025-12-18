import AddAdPage from "../components/profile/pages/AddAdPage";
import HeaderTabMenu from "../components/request/HeaderTabMenu";
import { getKeyRequest, getTypeRequest } from "../services/func/getTypeRequest";


export default function Profile() {
    return (
        <div className="w-full h-full bg-transparent rounded-2xl flex flex-col gap-1">
            <HeaderTabMenu text={'تکمیل نشده'} 
            titleRequest={getTypeRequest()} keyRequest={getKeyRequest()}/>
    
            <div className="w-full h-[87%] bg-white rounded-2xl py-3 px-5 flex flex-col gap-2 overflow-y-scroll">
                <AddAdPage/>
            </div>
        </div>
    )
}