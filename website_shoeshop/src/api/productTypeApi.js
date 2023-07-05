import axiosClient from './axiosClient'

const productTypeApi = {
    getProductType: () => {
        const url = ""
        return axiosClient.get(url)
    },
}

export default productTypeApi