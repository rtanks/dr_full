import axios from 'axios';
import HeaderAuth from './headerAndUrlService';

export default function historyService() {
    const { baseUrl, headers,id } = HeaderAuth();

    const getRequestsHistory = async () => {
        const response = await axios(`${baseUrl}/requests/user/${id}`, { headers });
        return response;
    }
    return {getRequestsHistory}
}