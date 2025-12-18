import { useState } from "react";
import Role from "./Role";

export default function UserRole({role, getRole}) {
    const roles = [{fa:"پزشک", en: "doctor"},{fa:"پرستار", en: "nurse"},{fa:"آزمایشگاه", en: "laboratory"},{fa:"تصویر برداری", en: "image"},{fa:"پیک", en: "courier"}];

    const getRoleSelected = (role) => {
        getRole(role)
    }
    return (
        <div className="w-full mt-5 flex flex-row flex-wrap gap-2 mb-3">
            {
                roles.map((roleItem, index) => <Role key={index} role={roleItem} roleSelected={role} getRoleSelected={getRoleSelected}/>)
            }
        </div>
    )
}