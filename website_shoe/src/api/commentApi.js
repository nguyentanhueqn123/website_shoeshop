import axiosClient from "./axiosClient";

const commentApi = {
    getCommentByProductId: (id) => {
        const url = `/comment/product/${id}`
        return axiosClient.get(url)
    },
    addComment: (body) => {
        const url = `/comment`
        return axiosClient.post(url, {...body})
    }   
}

export default commentApi