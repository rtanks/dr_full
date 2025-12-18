export default function Role({role, roleSelected, getRoleSelected}) {
    const selectRole = (e) => {
        getRoleSelected(role)
        console.log(role,e.target.title)
    }
    return(
        <button type="button" 
            onClick={(e) => selectRole(e)} 
            title={role.en} 
            className={`px-[14px] py-[7px] vazir-medium text-[16px] font-bold rounded-[10px] 
            ${roleSelected.en === role.en ? "bg-[#E6F3FF] text-[#006ECF]" : "bg-gray-200 text-gray-500"}`}>{role.fa}</button>
    )
}