import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchCoupon, fetchListCoupon } from './index'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getUrlQuery, useQuery } from '../../utils'
import { useSearchQuery, useCanUpdateQuery, usePathStoreQuery } from '../search/hook'

export const useListCoupon = () => useSelector((state) => state.coupon.listCoupon)

export const useCoupon = () => useSelector((state) => state.coupon.coupon)

export const useFetchListCoupon = (defaultQuery = {}) => {
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
        dispatch(fetchListCoupon({ ...queryUrl, ...defaultQuery }))
    }, [JSON.stringify(queryUrl)])
}

export const useFetchCoupon = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCoupon(id))
    }, [])

}