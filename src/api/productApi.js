import axiosClient from './axiosClient'

const productApi = {
    getProducts: (params) => {
        const url = '/product'
        return axiosClient.get(url, { params })
    },
    getProduct: (id) => {
        const url = `/product/${id}`
        return axiosClient.get(url)
    },
    postProduct: (body) => {
        const url = '/product'
        return axiosClient.post(url, {...body})
    },
    editProduct: (id, body) => {
        const url = `/product/${id}`
        return axiosClient.patch(url, {...body})
    },
    getProductByType: (type) => {
        const url = ""
        return axiosClient.get(url, type)
    },
    deleteProduct: (id) => {
        const url = `/product/${id}`
        return axiosClient.delete(url)
    },
    getAllProductType: () => {
        const url = '/product/getAllProductType'
        return axiosClient.get(url)
    },
    deleteProductType: (id) => {
        const url = `/product/type/${id}`
        return axiosClient.delete(url)
    },
    postProductType: (body) => {
        const url = '/product/type'
        return axiosClient.post(url, {...body})
    },
    editProductType: (id, body) => {
        const url = `/product/type/${id}`
        return axiosClient.patch(url, { ...body })
    },
    getProductType: (id) => {
        const url = `/product/type/${id}`
        return axiosClient.get(url)
    }
}

export default productApi