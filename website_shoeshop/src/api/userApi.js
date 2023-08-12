import axiosClient from './axiosClient'

const userApi = {
    getUser: (id) => {
        const url = `/user/${id}`
        return axiosClient.get(url)
    },
    getAllUsers: (params) => {
        const url = "/user"
        return axiosClient.get(url, {params})
    },
    postUser: (body) => {
        const url = '/user'
        return axiosClient.post(url, {...body}) 
    },
    editUser: (id,body) => {
        const url = `/user/${id}`
        return axiosClient.patch(url, {...body})
    },
    deleteUser: (id) => {
        const url = `/user/${id}`
        return axiosClient.delete(url)
    },
    login: (body) => {
        const url ='/user/login'
        return axiosClient.post(url, {...body})
    },
    register: (body) => {
        const url = '/user/register'
        return axiosClient.post(url, {...body})
    },
    getStaff: (params) => {
        const url = '/user/getStaff'
        return axiosClient.get(url, {params})
    },
  
    getAllCustomers: () => {
        const url = '/user/customers'
        return axiosClient.get(url)
    },
    addCart: (id, productId) => {
        const url = `/user/cart/${id}`
        return axiosClient.post(url, {
            productId: productId
        })
    },
    deleteCart: (id, productId) => {
        const url = `/user/cart/${id}`
        return axiosClient.delete(url, {
            data: {
                productId: productId
            }
        })
    }
}

export default userApi