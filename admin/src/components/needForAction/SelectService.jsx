import { useEffect, useState } from "react";
import ItemSelector from "./body/ItemSelector";

export default function SelectService({getService}) {
    const [activeItem, setActiveItem] = useState('mri')
    const services = [
        {id: 'mri', text:'ام ار آی'},
        {id: "graph", text: 'گرافی'}, 
        {id: "ct-scan", text: 'سی تی اسکن'},
        {id: "tripTest", text: 'تست نواری'},
        {id: "physiotherapy", text: 'فیزیوتراپی'},
        {id: "ultrasound", text: 'سونوگرافی'},
        {id: "test", text: 'آزمایش'},
        {id: "medicine", text: 'دارو'},
        {id: "transport", text: 'درخواست حمل و نقل'} 
    ];
    const getItem = (item) => {
        setActiveItem(item)
    }
    useEffect(() => {
        console.log(services.find(item => item.id == activeItem).text);
        getService(services.find(item => item.id == activeItem).text);
    }, [activeItem])
    return (
        <div className="w-full h-max flex flex-row gap-1.5 items-center overflow-x-scroll whitespace-nowrap mb-3">
            <ItemSelector items={services} activeItem={activeItem} getItem={getItem} boxSize={'w-max h-max'}/>
        </div>
    )
}