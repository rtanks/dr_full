import { NavLink } from "react-router-dom";
import classNames from 'classnames';
import React from "react";

export default function MenuItem({title, children, path, onClick}) {
    const baseClass = classNames({
        "w-full h-max flex flex-row items-center gap-2 py-2.5 sm:py-2 px-2 rounded-xl text-sm ": true
    })
    const childrenStyled = React.cloneElement(children, {
        color: path == location.pathname ? "#ffffff" : "#000000",
        size: 22
    })
    return (
        <NavLink to={path} onClick={onClick} 
        className={({isActive}) => (isActive ? (path == '#'? false: true) : isActive ) ? `${baseClass} text-white bg-main`: `${baseClass} text-black bg-[#f1f1f1]`}>
            {childrenStyled}
            <span>{title}</span>
        </NavLink>
    )
}