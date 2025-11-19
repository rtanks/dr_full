export default function PatientInfo({name, phoneNumber, time, date, nationalCode, insurance}) {
    return(
        <div className="w-full h-max flex flex-col gap-4 text-[#676767] vazir-medium text-[14px]">
            <div className="w-full h-[22px] flex flex-row items-center justify-between">
                <span>{name} / {phoneNumber}</span>
                <div className="w-[120px] h-full flex flex-row items-center gap-2">
                    <span>{time}</span>
                    <span>{date}</span>
                </div>
            </div>
            <p>کد ملی : {nationalCode}</p>
            <p>بیمه : {insurance}</p>
        </div>
    )
}