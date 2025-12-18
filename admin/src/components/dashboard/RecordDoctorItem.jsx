import classNames from "classnames"

export default function RecordDoctorItem({doctor, number, status, getItemSelected}) {
    const statusClass = classNames({
        "text-[#FF9E33]": !doctor.isActive,
        "text-[#006ECF]": doctor.isActive
    })
    return (
        <div className="w-full h-max sm:h-[70px] rounded-none sm:rounded-[20px] flex flex-col sm:flex-row gap-3 border-b border-[#e0e0e0] px-0.5 sm:border-0 sm:gap-0 justify-between item-center vazir-medium text-[14px] text-[#676767] bg-white py-3 sm:py-0 sm:px-5">
            <div className="w-full sm:w-4/6 flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between">
                <div className="w-full sm:w-[45%] flex flex-row items-center justify-between">
                    <div className="w-max flex flex-row gap-1">
                        <span className="text-[#006ecf]">{number}-{doctor.fullName}</span> / 
                        <span className="text-[#006ecf]">{doctor.medicalSystem}</span>
                    </div>
                    <span>{doctor.specialty}</span>
                </div>
                <div className="w-full sm:w-[48%] flex flex-row justify-between items-center">
                    <div className="w-max flex flex-row gap-2 items-center">
                        <span>{doctor.phoneNumber}</span>
                        <button className="border border-[#b5b5b5] rounded-[10px] px-4 py-2">کارمزد 50 درصد</button>
                    </div>
                    <div>
                        <span>{doctor.province}</span> / 
                        <span>{doctor.city}</span>
                    </div>
                </div>
            </div>
            <div className="w-full sm:w-[28%] flex flex-row items-center justify-between">
                <div className="w-max flex flex-row gap-1">
                    <span>وضعیت : </span>
                    <span className={statusClass}>{doctor.isActive ? "فعال" : "غیر فعال"}</span>
                </div>
                <div className="w-max flex flex-row gap-2">
                    <button onClick={() => getItemSelected({status: "setting", userSelected: doctor})} className={"bg-[#efefef] rounded-[10px] w-24 h-10"}>تنظیمات</button>
                    <button onClick={() => getItemSelected({status: "edit", userSelected: doctor})} className={"bg-[#efefef] rounded-[10px] w-24 h-10"}>ویرایش</button>
                </div>
            </div>
        </div>
    )
}