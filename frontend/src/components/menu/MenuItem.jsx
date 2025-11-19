import { NavLink } from "react-router-dom";
import classNames from 'classnames';

export default function MenuItem({title, children, path, onClick}) {
    const baseClass = classNames({
        "w-full h-max flex flex-row items-center gap-2 py-2 px-2 rounded-lg text-sm ": true
    })
    return (
        <NavLink to={path} onClick={onClick} className={({isActive}) => (isActive ? (path == '#'? false: true) : isActive ) ? `${baseClass} text-white bg-[#2C8073]`: `${baseClass} text-black bg-[#f1f1f1]`}>
            {children}
            <span>{title}</span>
        </NavLink>
    )
}