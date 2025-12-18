import { useEffect, useState } from "react"
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

export default function UserItemInforming({user, selectedUsers, selectAll, getUsersSelected}) {
    const [selectElem, setSelectElem] = useState(false);
    const getSelectItems = () => {
        if(selectElem) {
            setSelectElem(false);
            //unselect
            console.log(user)
            getUsersSelected({ ids: selectedUsers.ids.filter(item => item != user._id),
                users: selectedUsers.users.filter(item => item._id != user._id)})
            console.log({ ids: selectedUsers.ids.filter(item => item != user._id),
                users: selectedUsers.users.filter(item => item._id != user._id)})
        } else {
            //select
            setSelectElem(true)
            console.log(user)
            if(selectedUsers.users.length == 0) {
                getUsersSelected({ ids:  [user._id], users: [user] })
                console.log({ ids:  [user._id], users: [user] })
            } else {
                getUsersSelected({ids: [...selectedUsers.ids, user._id], users: [...selectedUsers.users, user]})
                console.log({ ids: [...selectedUsers.ids, user._id], users: [...selectedUsers.users, user]})
            }
        }
    }
    useEffect(() => {
        if(selectAll) {
            setSelectElem(true)
        } else {
            setSelectElem(false)
        }
    }, [selectAll])
    return (
        <div key={user._id} className="bg-white w-full flex flex-row items-center justify-between p-5 rounded-xl text-[#676767]">
            <div className="w-max flex flex-row items-center gap-20">
                <div className="w-max flex flex-row items-center gap-5">
                    <button type="button" onClick={getSelectItems} className="w-max">
                        {
                            selectElem ? (
                                <IoMdCheckboxOutline size={22} color="#000"/>
                            ) : (
                                <MdOutlineCheckBoxOutlineBlank size={22} color="#000"/>
                            )
                        }
                    </button>
                    <div className="w-max flex flex-row items-center gap-1">
                        <span>{user.fullName}</span> / 
                        <span>{user.nationalCode}</span>
                    </div>
                </div>
                <div className="w-max flex flex-row items-center gap-1">
                    <span>{user.province}</span> / 
                    <span>{user.city}</span>
                </div>
            </div>
            <button className={"bg-[#efefef] rounded-[10px] w-1/3 sm:w-24 h-10"}>سابقه</button>
        </div>
    )
}