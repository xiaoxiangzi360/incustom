export const cartAuth = () => {
    const { $api } = useNuxtApp()


    const getCart = async () => {
        try {
            const response = await $api('/user/userShoppingCart/listUserShoppingCart', {
                method: 'GET',
            })

            return response
        } catch (error) {

            throw error
        }
    }
    const creatCart = async (data: any) => {
        try {
            const response = await $api('/user/userShoppingCart/createUserShoppingCart', {
                method: 'POST',
                body: data,
            })


            return response
        } catch (error) {

            throw error
        }
    }
    const updateCart = async (data: any) => {
        try {
            const response = await $api('/user/userShoppingCart/updateUserShoppingCartById', {
                method: 'POST',
                body: data,
            })


            return response
        } catch (error) {

            throw error
        }
    }
    const deleteCart = async (data: any) => {
        try {
            const response = await $api('/user/userShoppingCart/deleteUserShoppingCartByIdList', {
                method: 'POST',
                body: data,
            })


            return response
        } catch (error) {

            throw error
        }
    }

    return { getCart, creatCart, deleteCart, updateCart }
}
