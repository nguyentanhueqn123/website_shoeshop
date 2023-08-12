import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchInvoice, fetchListInvoice, fetchTotal, fetchCost } from './index'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getUrlQuery, useQuery } from '../../utils'
import { useSearchQuery, useCanUpdateQuery, usePathStoreQuery } from '../search/hook'

export const useListInvoice = () => useSelector((state) => state.invoice.listInvoice)

export const useInvoice = () => useSelector((state) => state.invoice.invoice)

export const useTotal = () => useSelector(state => state.invoice.total)

export const useCost = () => useSelector(state => state.invoice.cost)

export const useFetchListInvoice = (defaultQuery = {}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = window.location.pathname
    const searchObj = useSearchQuery()
    const queryUrl = useQuery()
    const canUpdateQuery = useCanUpdateQuery()
    const pathNameQuery = usePathStoreQuery()

    useEffect(() => {
        if (canUpdateQuery && location === pathNameQuery) {
            navigate(getUrlQuery(location, searchObj))
        }
    }, [JSON.stringify(searchObj)])

    useEffect(() => {
        dispatch(fetchListInvoice({ ...queryUrl, ...defaultQuery }))
    }, [JSON.stringify(queryUrl)])
}

export const useFetchInvoice = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchInvoice(id))
    }, [])
}

export const useFetchReport = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTotal())
        dispatch(fetchCost())
    }, [])
}