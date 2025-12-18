export default function RequestAndExplain({typeRequest, titleRequest, explain}) {
    return(
        <div className="w-full flex flex-col items-center vazir-medium gap-3">
            <div className="w-full text-black text-[16px]">درخواست ثبت {typeRequest}</div>
            <div className="w-full text-[#676767] text-[14px]">{titleRequest}</div>
            <p className="w-full h-[128px] p-5 rounded-[20px] text-[14px] text-[#676767] bg-[#f7f7f7]">
                توضیحات : {explain}
            </p>
        </div>
    )
}