import { createSlice } from "@reduxjs/toolkit";
import couponApi from '../../api/couponApi';

const initialState = {
    coupon: undefined,
    listCoupon: undefined
}

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        setListCoupon: (state,action) => {
            state.listCoupon = action.payload
        },
        setCoupon: (state,action) => {
            state.coupon = action.payload
        }
    }
})

export const fetchCoupon = (name) => async (dispatch) => {
    try {
        const response = await couponApi.getCouponById(name)
        dispatch(setCoupon(response))
    } catch (error) { }
}

export const fetchListCoupon = (params = {}) => async (dispatch) => {
    try {
        const response = await couponApi.getListCoupon({ ...params })
        dispatch(setListCoupon(response))
    } catch (error) { }
}

export const {
    setCoupon,
    setListCoupon
} = couponSlice.actions

export default couponSlice.reducer
