const Api_Url = 'http://localhost:5000/api/admin/products';

export const createProductApi = async (productData) => {
    try {
        const response = await fetch(`${Api_Url}/add`, {
            method: 'POST',
            credentials: 'include',
            body: productData
        })

        const data = await response.json()

        if(!response.ok){
            throw new Error(data.message || 'failed to create product')
        }

        return data;
    } catch (error) {
        console.log(error)
        throw Error(error)
    }
}

export const getProducts = async () => {
    try {
        const res = await fetch(`${Api_Url}/`, {
            method: 'GET',
            credentials: 'include',
        })

        if(!res.ok) throw new Error('Failed to get products')

        const data = res.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}