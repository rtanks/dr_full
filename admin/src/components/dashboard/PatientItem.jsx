import classNames from "classnames"

export default function PatientItem({patient, number, getItemSelected, getPatient}) {
    const statusClass = classNames({
        "text-[#FF9E33]": !patient?.isActive,
        "text-[#006ECF]": patient?.isActive
    })
    return (
        <div className="w-full h-max sm:h-[70px] border-b border-b-[#e0e0e0] sm:border-0 sm:rounded-[20px] flex flex-col sm:flex-row justify-between gap-4 sm:gap-5 item-center vazir-medium text-[14px] text-[#676767] bg-white py-4 sm:py-0 sm:px-5">
            <div className="w-full sm:w-[30%] flex flex-row items-center justify-between">
                <div className="w-max flex flex-row gap-1">
                    <span className="text-[#006ecf]">{number}-{patient?.fullName}</span> / 
                    <span className="text-[#006ecf]">{patient?.nationalCode}</span>
                </div>
                <div className="w-max flex flex-row gap-1 items-center">تلفن : {patient?.phoneNumber}</div>
            </div>
            <div className="w-full sm:w-[25%] sm:mr-10 flex flex-row items-center justify-between">
                <div className="w-max flex flex-row items-center gap-1">
                    <span>{patient?.province}</span> / 
                    <span>{patient?.city}</span>
                </div>
                <div className="w-max flex flex-row gap-1">
                    <span>وضعیت : </span>
                    <span className={statusClass}>{patient?.isActive ? "فعال" : "غیرفعال"}</span>
                </div>
            </div>
            <div className="w-full sm:w-[28%] sm:px-2 flex flex-row items-center justify-between">
                <div className="w-full flex flex-row gap-2">
                    <button onClick={() => getItemSelected({status: "pay", userSelected: patient})} className={"bg-[#efefef] rounded-[10px] w-1/3 sm:w-24 h-10"}>ایجاد پرداخت</button>
                    <button onClick={() => {getItemSelected({status: "history", userSelected: patient}); getPatient(patient)}} className={"bg-[#efefef] rounded-[10px] w-1/3 sm:w-24 h-10"}>سابقه</button>
                    <button onClick={() => getItemSelected({status: "edit", userSelected: patient})} className={"bg-[#efefef] rounded-[10px] w-1/3 sm:w-24 h-10"}>ویرایش</button>
                </div>
            </div>
        </div>
    )
}