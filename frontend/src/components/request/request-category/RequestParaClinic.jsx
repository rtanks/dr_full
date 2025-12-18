export default function RequestParaClinic({data}) {
    return (
        <>
            <div className="w-full h-max flex flex-col gap-2 mb-2 ">
                <div className="w-full h-max flex flex-row gap-1 text-md font-bold">
                    <span>درخواست</span>
                    <span>{data?.request?.service}</span>
                </div>
                <div className="w-full h-max flex flex-col gap-1 mb-3 text-md text-676767">
                    {
                        data?.request?.area ? (
                            <>
                                <div className="w-full h-max flex flex-col gap-2">{data?.request?.area.map(item => (
                                    <div className="w-max h-max flex flex-row gap-2 sm:gap-3">
                                        <span>{item}</span>
                                    </div>
                                ))}</div>
                            </>
                        ) : ("")
                    }
                </div>
                <div className="w-full h-max flex flex-row gap-1 text-md text-676767">
                    <span className="text-[#555]">بیمه : </span>
                    <span>{data?.request?.insurance}</span>
                </div>
            </div>
            <div className="w-full h-max rounded-xl py-2 px-3 bg-gray-200">
                <span>توضیحات : </span>
                <span>{data?.request?.explain}</span>
            </div>
        </>
    )
}