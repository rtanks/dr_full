import {shahr, ostan} from "iran-cities-json";
import { useState } from "react";

export const useCities = () => {
    const [cities, setCities] = useState(null)

    const setProvince = () => {
        return ostan;
    }
    const getCities = (id) => {
        console.log(id)
        setCities(shahr.filter(city => city.ostan == id))
    }

    return {cities, setProvince, getCities}
}