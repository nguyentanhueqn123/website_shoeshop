import { createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";

const initialState = {
    users: undefined,
    user: undefined,
    allStaff: undefined,
    allCustomers: undefined,
    userLogin: undefined,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setAllStaff: (state,action) => {
            state.allStaff = action.payload
        },
        setAllCustomers: (state, action) => {
            state.allCustomers = action.payload
        },
        setUserLogin: (state, action) => {
            state.userLogin = action.payload
        }
    }
})

export const fetchAllUsers = (params = {}) => async (dispatch) => {
    try {
        const response = await userApi.getAllUsers({...params})
        dispatch(setUsers(response))
    } catch (error) {
        console.log(error)
    }
}

export const fetchUser = (id) => async (dispatch) => {
    try {
        const response = await userApi.getUser(id)
        dispatch(setUser(response))
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllStaff = (params = {}) => async (dispatch) => {
    try {
        const response = await userApi.getStaff({...params})
        dispatch(setAllStaff(response))
    } catch (error) {
        console.log(error)
    }
}

export const fetchAllCustomers = () => async (dispatch) => {
    try {
        const response = await userApi.getAllCustomers()
        dispatch(setAllCustomers(response))
    } catch (error) {
        console.log(error)
    }
}

export const {
    setUsers,
    setUser,
    setAllStaff,
    setAllCustomers,
    setUserLogin
} = userSlice.actions

export default userSlice.reducer
