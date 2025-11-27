const API_URL = "http://localhost:5000/api/admin";

export const signUpAdmin = async (name, email, password) => {
    try {
        const res = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name, email, password}),
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || "Failed to sign up");
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const logInAdmin = async (email, password) => {
    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: 'include', 
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if(!res.ok) throw new Error(data.message || "Failed to log in");
        return data;
    } catch (error) {
        console.error(error)
    } 
}

export const getDashboard = async () => {
    try {
        const res = await fetch(`${API_URL}/dashboard`, {
            method: "GET",
            credentials: 'include',
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