import Cookies from "js-cookie";

export const baseUrl = 'https://api.tda24.ir';
// export const baseUrl = 'https://192.168.1.3:5000';

export default function HeaderAuth() {
    const baseUrl = 'https://api.tda24.ir';
    // const baseUrl = 'https://192.168.1.3:5000';
    // const frontBaseUrl = 'https://192.168.1.3:5173';
    const frontBaseUrl = 'https://tda24.ir';
    const imageUrl = 'http://files.tda24.ir';
    // const imageUrl = 'https://192.168.1.3:5000';
    
    const accessToken = Cookies.get('accessToken');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    }
    const id = Cookies.get('id');
    const requestId = Cookies.get('requestId');
    
    return {headers, baseUrl, frontBaseUrl, id, requestId, imageUrl}
}