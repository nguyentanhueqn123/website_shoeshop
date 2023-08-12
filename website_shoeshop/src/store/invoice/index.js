import { createSlice } from "@reduxjs/toolkit";
import invoiceApi from './../../api/invoiceApi';

const initialState = {
    listInvoice: undefined,
    invoice: undefined,
    total: undefined,
    cost: undefined,
}

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setListInvoice: (state,action) => {
            state.listInvoice = action.payload
        },
        setInvoice: (state,action) => {
            state.invoice = action.payload
        },
        setTotal: (state,action) => {
            state.total = action.payload
        },
        setCost: (state,action) => {
            state.cost = action.payload
        }
    }
})

export const fetchInvoice = (id) => async (dispatch) => {
    try {
        const response = await invoiceApi.getInvoice(id)
        dispatch(setInvoice(response))
    } catch (error) { }
}

export const fetchListInvoice = (params = {}) => async (dispatch) => {
    try {
        const response = await invoiceApi.getListInvoice({...params})
        dispatch(setListInvoice(response))
    } catch (error) { }
}

export const fetchTotal = () => async (dispatch) => {
    try {
        const response = await invoiceApi.getTotal()
        dispatch(setTotal(response))
    } catch (error) {}
}

export const fetchCost = () => async (dispatch) => {
    try {
        const response = await invoiceApi.getCost()
        dispatch(setCost(response))
    } catch (error) {}
}

export const {
    setInvoice,
    setListInvoice,
    setTotal,
    setCost
} = invoiceSlice.actions

export default invoiceSlice.reducer
