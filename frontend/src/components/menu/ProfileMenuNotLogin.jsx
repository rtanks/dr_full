import RegisterOrLogin from "./RegisterOrLogin";

export default function ProfileMeuNotLogin() {
    return (
        <div className="w-full h-full flex flex-row items-center justify-between ">
            <div className='w-14 h-14 rounded-xl bg-[#f1f1f1] flex justify-center items-center text-2xl'>?</div>
            <RegisterOrLogin/>
        </div>
    )
}