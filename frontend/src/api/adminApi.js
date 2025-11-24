const API_URL = "http://localhost:5000/api/admin";

export const logInAdmin = async (email, password) => {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || "Failed to log in");
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const getDashboard = async (token) => {
    try {
        const res = await fetch(`${API_URL}/dashboard`, {
            method: "GET",
            headers: { authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if(!res.ok) {
            throw new Error(data.message || "Failed to fetch dashboard data");
        }
        return data;
    } catch (error) {
        console.error(error);
    }
}