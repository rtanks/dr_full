import ItemSelector from "../../general/ItemSelector"

export default function SelectSide ({sideActive, getSide}) {
    const sides = [{id: 'front', text: 'رو به رو'}, {id: 'back', text: 'پشت سر'}]
    
    return (
        <div className="w-full sm:w-[50%] h-max flex flex-row gap-2 items-center justify-center">
            <ItemSelector items={sides} activeItem={sideActive} getItem={getSide} boxSize={"h-max w-24 "}/>
        </div>
    )
}