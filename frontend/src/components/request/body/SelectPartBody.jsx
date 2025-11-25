import { useEffect, useState } from "react"
import bodyFront from '../../../assets/images/body-front.png'
import bodyBack from '../../../assets/images/body-back.png'
import SelectSide from "./SelectSide";
import CompleteTitle from "../../CompleteTitle";
import BodyFront from "./BodyFront";
import BodyBack from "./BodyBack";
import SelectAreaContainer from "./SelectAreaContainer";
import ItemsAreaSelected from "./ItemsAreaSelected";

export default function SelectPartBody({getAreas}) {
    const [selectSide, setSelectSide] = useState('front');
    const [activeItems, setActiveItems] = useState([]);
    const [itemsArea, setItemsArea] = useState([]);

    const getSide = (side) => {
        setSelectSide(side);
    }
    const getItemsArea = (value) => {
        setItemsArea(value);
    }
   const getActiveItems = (value) => {
    if(activeItems.length == 0) {
        setActiveItems([value]);
    } else {
        if(!activeItems.find(item => item == value)) {
            setActiveItems(prev => [...prev, value]);
        }
    }
   }
   const itemActiveFind = (value) => {
    if(activeItems.length == 0) {
       return false;
    } else {
        if(activeItems.find(item => item == value)) {
            return true;
        }else {
            return false;
        }
    }
   }
   const deleteItem = (value) => {
    if(activeItems.length != 0) {
       const newArray = activeItems.filter(item => item != value);
       setActiveItems(newArray)
    } 
   }
   const deleteItemSelected = (value) => {
    if(activeItems.length != 0) {
        if(activeItems.find(item => item == value)) {
            const newArray = activeItems.filter(item => item != value);
            setActiveItems(newArray)
        }
    } 
   }
    const showSide = () => {
       return selectSide == 'front' ? <BodyFront getItemsArea={getItemsArea} pic={bodyFront}/> : <BodyBack getItemsArea={getItemsArea} pic={bodyBack}/> ;
    }
    useEffect(() => {
        setItemsArea('')
    }, [selectSide])
    return (
        <div className="w-full h-max flex flex-col gap-2">
            <div className="w-full h-max flex flex-col gap-5 mt-10">
                <div className="w-full h-max flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between items-end">
                    <div className="w-full sm:w-[50%] h-max flex flex-col gap-1">
                        <CompleteTitle title={'انتخاب کنید'}/>
                        <p className="text-sm text-676767 font-bold">نزدیکترین ناحیه به مشکل خود را انتخاب کنید ( 1 یا بیشتر ) </p>
                    </div>
                    <SelectSide sideActive={selectSide} getSide={getSide}/>
                </div>
                <div className="w-full h-[51vh] sm:h-[77vh] flex flex-row px-0 sm:px-10">
                    <div className="w-2/5 sm:w-[53%] pt-3">
                        {
                            itemsArea.length == 0 ? (
                                <div className="w-[90%] h-max p-2 text-center font-bold text-676767 bg-zinc-200 mx-auto rounded-xl text-xs sm:text-sm">لطفاََابتدا ناحیه مورد نظر را انتخاب کنید</div>
                            ) : (
                                <div className="w-full h-full flex flex-col items-center pt-3">
                                    <SelectAreaContainer items={itemsArea} deleteItem={deleteItemSelected} activeItemFind={itemActiveFind} getArea={getActiveItems}/>
                                </div>
                            )
                        }
                    </div>
                    <div className="w-3/5 sm:w-[47%] h-full">
                        {showSide()}
                    </div>
                </div>
            </div>
            <div className="w-full h-max flex flex-col gap-4">
                <div className="text-md font-bold text-676767">نواحی انتخاب شده</div>
                <div className="w-full h-max flex flex-row gap-2 flex-wrap">
                    <ItemsAreaSelected getAreas={getAreas} items={activeItems} deleteItem={deleteItem}/>
                </div>
            </div>
        </div>
    )
}