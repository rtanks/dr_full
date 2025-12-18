import Cookies from "js-cookie";

export const baseUrl = 'https://api.tda24.ir';
// export const baseUrl = 'https://localhost:5000';

export default function HeaderAuth() {
    const baseUrl = 'https://api.tda24.ir';
    // const baseUrl = 'https://localhost:5000';
    // const frontBaseUrl = 'https://localhost:5173';
    const frontBaseUrl = 'https://tda24.ir';

    const headers = {
        'Content-Type': 'application/json',
    }
    // const id = Cookies.get('id');
    
    return {headers, baseUrl}
}