import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUser, fetchAllUsers, fetchAllStaff, fetchAllCustomers } from './index'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getUrlQuery, useQuery } from '../../utils'
import { useSearchQuery, useCanUpdateQuery, usePathStoreQuery } from '../search/hook'

export const useUsers = () => useSelector((state) => state.user.users)

export const useUser = () => useSelector((state) => state.user.user)

export const useAllStaff = () => useSelector((state) => state.user.allStaff)

export const useAllCustomers = () => useSelector(state => state.user.allCustomers) 

export const useUserLogin = () => useSelector(state => state.user.userLogin)

export const useFetchUsers = (defaultQuery = {}) => {
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
        dispatch(fetchAllUsers({ ...queryUrl, ...defaultQuery }))
    }, [JSON.stringify(queryUrl)])
}

export const useFetchUser = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser(id))
    }, [])

}

export const useFetchAllStaff = (defaultQuery = {}) => {
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
        dispatch(fetchAllStaff({ ...queryUrl, ...defaultQuery }))
    }, [JSON.stringify(queryUrl)])
}

export const useFetchAllCustomers = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllCustomers())
    }, [])
}