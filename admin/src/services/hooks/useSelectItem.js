import { useState } from "react";

export default function useSelectProfileItem() {
    const [showItem, setShowItem] = useState(null);
    const getItemSelected = (name) => {
        setShowItem(name);
    }
    const goBack = () => {
        setShowItem(null)
    } 
    return {
        showItem,
        getItemSelected,
        goBack
    }
}