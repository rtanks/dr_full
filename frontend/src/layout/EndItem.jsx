import { Outlet } from "react-router-dom";

export default function EndItem() {
    return (
        <section id="snap2" className='sm:w-[45%] w-full h-full shrink-0 snap-center bg-transparent'>
          <div className='w-full h-full flex flex-col gap-4 shrink-0 snap-end bg-transparent rounded-2xl overflow-y-scroll relative'>
            <Outlet/>
          </div>
        </section>
    )
}