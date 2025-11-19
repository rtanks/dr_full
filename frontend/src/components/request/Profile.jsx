export default function Profile({name, requestTitle}) {
    return (
        <div className='w-full h-[10%] flex flex-row justify-start items-center gap-3 p-2'>
          <div className='w-12 h-12 bg-[#aaa] rounded-full'></div>

          <div className='w-max h-max flex flex-col'>
            <span className='font-bold'>بیمار {name}</span>
            <span className='text-sm text-zinc-500'>{requestTitle}</span>
          </div>
        </div>
    )
}