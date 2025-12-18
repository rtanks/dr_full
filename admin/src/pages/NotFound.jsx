export default function NotFound() {
    return (
        <div className="w-full h-screen flex flex-col gap-7 justify-center items-center">
            <div className="w-max h-max text-md sm:text-xl text-[#585858] vazir-medium text-center">صفحه مورد نظر یافت نشد</div> 
            <button type="button" onClick={() => window.history.back()} 
                className="bg-[#006ECF] text-white px-10 py-2 text-sm sm:text-md rounded-lg">بازگشت</button>
        </div>
    )
}