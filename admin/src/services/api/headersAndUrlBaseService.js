export default function headersAndUrlBaseService() {
    const baseUrl = "https://api.tda24.ir";
    // const baseUrl = "https://localhost:5000";
    const headers = {
        "Content-Type": "application/json",
    }
    return {headers, baseUrl}
}