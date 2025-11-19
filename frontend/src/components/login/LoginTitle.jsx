import logo from '../../assets/logo.png'

export default function LoginTitle() {
    return (
        <div className="w-full h-max mt-5 mb-5 flex flex-col items-center">
            <img src={logo} alt='logo' className='w-28 h-max'/>
            <div className="mt-2 text-black font-bold text-md">
                سامانه جامع آموزش و درمان (تی دا)
            </div>
            <div className="mt-1 text-sm text-gray-500">
                همه سلامت اینجاست
            </div>
        </div>
    )
}