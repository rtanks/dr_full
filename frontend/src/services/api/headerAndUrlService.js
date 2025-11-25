import Cookies from "js-cookie";

// export const baseUrl = 'http://localhost:5000';
export const baseUrl = 'https://api.tda24.ir';
export default function HeaderAuth() {
    const baseUrl = 'https://api.tda24.ir';
    const accessToken = Cookies.get('accessToken');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    }
    const id = Cookies.get('id');
    
    return {headers, baseUrl, id}
}