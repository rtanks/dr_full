export default function RequestDoctor({data}) {
    console.log(data)
    return (
        <>
            <div className="w-full h-max flex flex-col gap-2 mb-2 ">
                <div className="w-full h-max flex flex-row gap-1 text-md font-bold">
                    <span>درخواست</span>
                    <span>{data?.request?.service}</span>
                </div>
                <div className="w-full h-max flex flex-row gap-1 text-md text-676767">
                    <span className="text-[#555]">پزشک : </span>
                    <span>{data?.request?.doctor}</span>
                </div>
                <div className="w-full h-max flex flex-row gap-1 text-md text-676767">
                    <span className="text-[#555]">زمان مراجعه : </span>
                    <span>{data?.request?.dateRefer?.date}</span>
                </div>
            </div>
            <div className="w-full h-max flex flex-col gap-1 mb-3 text-md text-676767">
                {
                    data?.request?.medicine ? (
                        <>
                            <div className="text-[#555]">دارو : </div> 
                            <div className="w-full h-max flex flex-col border border-a7a7a7 rounded-md">
                                <div className={`w-full h-max flex flex-row gap-2 sm:gap-3 border-b border-a7a7a7`}>
                                        <span className="flex-1 font-bold text-center py-1 border-l border-l-a7a7a7">نام</span>
                                        <span className="flex-1 font-bold text-center py-1 border-l border-l-a7a7a7">دوز</span>
                                        <span className="flex-1 font-bold text-center py-1 border-l border-l-a7a7a7">تعداد</span>
                                        <span className="flex-1 font-bold text-center py-1">مصرف</span>
                                    </div>
                                {data?.request?.medicine.map((item, index) => (
                                    <div className={`w-full h-max flex flex-row gap-2 sm:gap-3 
                                        ${data?.request?.medicine?.length === index + 1 ? "" : "border-b border-a7a7a7"}`}>
                                        <span className="flex-1 text-center py-1 border-l border-l-a7a7a7">{item.name}</span>
                                        <span className="flex-1 text-center py-1 border-l border-l-a7a7a7">{item.dose}</span>
                                        <span className="flex-1 text-center py-1 border-l border-l-a7a7a7">{item.count}</span>
                                        <span className="flex-1 text-center py-1">{item.freq}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : ("")
                }
            </div>
            <div className="w-full h-max rounded-xl py-2 px-3 bg-gray-200">
                <span>توضیحات : </span>
                <span>{data?.request?.explain}</span>
            </div>
        </>
    )
}