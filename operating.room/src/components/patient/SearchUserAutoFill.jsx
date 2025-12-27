import axios from "axios";
import HeaderAuth from "../../services/api/headerAndUrlService";

export default function SearchUserAutoFill({getUser, getValue}){
    const {baseUrl, headers} = HeaderAuth()
    const searchWithoutCp = (key, value) => {
        console.log(key, value)
        axios.get(`${baseUrl}/users/search/limit/?key=${key}&value=${value}&limit=1`, {headers}).then( res => {
            console.log(res)
            getUser(res.data[0]);
        }).catch(err => {
            console.log(err);
        })
    }
    const searchValue = (e) => {
        const searchVal = e.target.value;
        console.log(searchVal)
        getValue('nationalCode',e.target.value);
        if(!(searchVal == '' || searchVal == null) && e.target.value.length == 10) {
            searchWithoutCp("nationalCode", e.target.value)
        }
    }
    return (
        <input type="text" onChange={(e) => searchValue(e)}
            maxLength={10} id="nationalId" 
            placeholder="کد ملی" inputMode="numeric" 
        />
    )
}