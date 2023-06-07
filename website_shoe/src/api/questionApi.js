import axiosClient from './axiosClient'

const questionApi = {
    getQuestionByProductId: (id) => {
        const url = `/question/product/${id}`
        return axiosClient.get(url)
    },
    addQuestion: (body) => {
        const url = `/question`
        return axiosClient.post(url, { ...body })
    },
    editQuestion: (id, body) => {
        const url = `/question/${id}`
        return axiosClient.patch(url, { ...body })
    },
    deleteQuestion: (id) => {
        const url = `/question/${id}`
        return axiosClient.delete(url)
    }
}

export default questionApi