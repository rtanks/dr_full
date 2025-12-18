export default function CallInformationItem({title, href, src, onlineUser}) {
    return (
        <div className="flex flex-col items-center gap-[6px]">
          <a href={href}><img src={src} alt={title}
            className="w-12 h-12 rounded-full p-[6px] hover:scale-110 transition"
          /></a>
          <div className="text-[13px] font-semibold">{title}</div>
          <div className="text-xs">{onlineUser}</div>
        </div>
    )
}