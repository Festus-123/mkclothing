const Api_Url = 'http://localhost:5000/api/admin/products';

export const createProductApi = async (productData) => {
    try {
        const response = await fetch(`${Api_Url}/add`, {
            method: 'POST',
            credentials: 'include',
            body: productData
        })

        const data = await response.json()

        if(!response){
            throw new Error(data.message || 'failed to create product')
        }

        return data;
    } catch (error) {
        console.log(error)
        throw Error(error)
    }
}