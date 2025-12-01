const ApiUrl = 'http://localhost:5000/api/admin';

export const fetchAnalytics = async () => {
    try {
        const response = await fetch(`${ApiUrl}/analytics`, {
            method: 'GET',
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error('Failed to fetch analytics', errorData.message);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Error fetching analytics:', error);
    }
}