import axios from "axios"
import { API_BASE_URL } from '../config/index'
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
})

export default axiosClient
