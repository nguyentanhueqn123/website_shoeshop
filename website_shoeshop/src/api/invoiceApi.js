import axiosClient from './axiosClient'

const invoiceApi = {
    getListInvoice: (params) => {
        const url = "/invoice"
        return axiosClient.get(url, { params })
    },
    getInvoice: (id) => {
        const url= `/invoice/${id}`
        return axiosClient.get(url)
    },
    postInvoice: (body) => {
        const url = "/invoice"
        return axiosClient.post(url, {...body})
    },
    deleteInvoice: (id) => {
        const url = `/invoice/${id}`
        return axiosClient.delete(url)
    },
    editInvoice: (id, body) => {
        const url = `/invoice/${id}`
        return axiosClient.patch(url, {...body})
    },
    getTotal: () => {
        const url = '/invoice/total'
        return axiosClient.get(url)
    },
    getCost: () => {
        const url = '/invoice/cost'
        return axiosClient.get(url)
    }
}

export default invoiceApi