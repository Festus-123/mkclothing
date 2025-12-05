const Api_Url = 'http://localhost:5000/api/admin/logs';

export const getLogsApi = async () => {
    try {
        const res = await fetch(`${Api_Url}/`, {
        method: 'GET',
        credentials: 'include',
    })

    if(!res.ok) throw new Error('failed to get logs')

    const data = res.json();
    return data;
} catch (error) {
    console.log('error', error)
}
}