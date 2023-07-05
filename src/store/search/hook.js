import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import {
    setPathName,
    setQuery,
    resetSearchData,
    setCanUpdateQuery
} from './index'
import { useQuery } from '../../utils'
import { formatQueryProducts } from '../search/helper'
export const useSearchQuery = () => useSelector(state => state.search.query)

export const useSearch = () => useSelector(state => state.search)

export const useSearchData = () => useSelector((state) => state.search.data)

export const useCanUpdateQuery = () => useSelector((state) => state.search.canUpdateQuery)

export const usePathStoreQuery = () => useSelector((state) => state.search.pathName)

export const useUpdateQuery = () => {
    const dispatch = useDispatch()
    const searchData = useSearch()
    const searchStr = JSON.stringify(searchData)
    const canUpdateQuery = useCanUpdateQuery()
    const location = window.location.pathname

    useEffect(() => {
        if (canUpdateQuery) {
            const parseQuery = formatQueryProducts(searchStr)
            dispatch(setQuery(parseQuery))
        }
    }, [searchStr, canUpdateQuery])

    useEffect(() => {
        setTimeout(() => {
            dispatch(setPathName(location))
        }, 1000)
        return () => {
            dispatch(resetSearchData())
        }
    }, [])
}

export const useUpdateSearch = () => {
    const dispatch = useDispatch()
    const query = useQuery()

    useEffect(() => {
        dispatch(setCanUpdateQuery(true))
    }, [JSON.stringify(query)])

    useEffect(() => {
        return () => {
            dispatch(setCanUpdateQuery(false))
        }
    }, [])
    
}