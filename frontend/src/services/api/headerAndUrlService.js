import Cookies from "js-cookie";

export const baseUrl = 'http://localhost:5000';
// export const baseUrl = 'http://192.168.88.187:5000';
// http://192.168.1.5:5000
export default function HeaderAuth() {
    const baseUrl = 'http://localhost:5000';
    // const baseUrl = 'http://192.168.88.187:5000';
    const accessToken = Cookies.get('accessToken');

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    }
    const id = Cookies.get('id');
    
    return {headers, baseUrl, id}
}