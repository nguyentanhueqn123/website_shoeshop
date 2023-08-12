import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {
    fetchProduct,
    fetchProducts,
    fetchProductsByType,
    fetchAllProductType,
    fetchProductType
} from './index'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getUrlQuery, useQuery } from '../../utils'
import { useSearchQuery, useCanUpdateQuery, usePathStoreQuery } from '../search/hook'
export const useProducts = () => useSelector((state) => state.product.products)

export const useProduct = () => useSelector((state) => state.product.product)

export const useAllProductType = () => useSelector((state) => state.product.allProductType)

export const useProductType = () => useSelector((state) => state.product.productType)

export const useTotalPrice = () => useSelector(state => state.product.totalPrice)

export const useCart = () => useSelector(state => state.product.cart)

export const useFetchProducts = (defaultQuery = {}) => {
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
        dispatch(fetchProducts({ ...queryUrl, ...defaultQuery }))
    }, [JSON.stringify(queryUrl)])
}

export const useFetchProductsByType = () => {
    const { type } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProductsByType(type))
    }, [])
}

export const useFetchProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProduct(id))
    }, [])
}

export const useFetchAllProductType = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllProductType())
    }, [])
}

export const useFetchProductType = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProductType(id))
    }, [])
}
