import { useLocation } from 'react-router-dom'

export const useQuery = () => {
    return Object.fromEntries(new URLSearchParams(useLocation().search))
}

export const formatQuery = (query) =>
    Object.keys(query)
        .map((key) => `${key}=${query[key]}`)
        .join('&')

export const getUrlQuery = (pathname, query) => {
    let _query = Object.assign({}, query)
    if (_query?.page === 1) {
        delete _query.page
    }
    const queryString = formatQuery(_query)
    return `${pathname}${queryString ? `?${queryString}` : ''}`
}

export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}