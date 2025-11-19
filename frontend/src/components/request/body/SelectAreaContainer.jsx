import SelectAreaItem from "./SelectAreaItem";

export default function SelectAreaContainer({items, activeItem, getArea}) {
    return (
        <div className="w-[90%] h-max flex flex-col gap-1.5">
            <SelectAreaItem items={items} activeItem={activeItem} getItem={getArea} boxSize={'h-max w-full'}/>
        </div>
    )
}