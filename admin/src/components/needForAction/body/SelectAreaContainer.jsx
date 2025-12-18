import SelectAreaItem from "./SelectAreaItem";

export default function SelectAreaContainer({items, activeItemFind, getArea, deleteItem}) {
    return (
        <div className="w-[90%] h-max flex flex-col gap-1.5">
            <SelectAreaItem items={items} activeItemFind={activeItemFind}
            getActiveItems={getArea} deleteItem={deleteItem} boxSize={'h-max w-full'}/>
        </div>
    )
}