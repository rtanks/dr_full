import { Outlet } from "react-router-dom";

export default function Reagent() {
    return (
        <div className='w-full h-full px-1 sm:px-0'>
          {/* <div dir='rtl' className={`w-full h-full scroll-smooth snap-x snap-mandatory flex flex-row gap-1.5 sm:gap-5 p-2 sm:p-3 overflow-x-scroll sm:justify-center sm:overflow-x-hidden`}> */}
            <Outlet/>
          {/* </div> */}
        </div>
    )
}