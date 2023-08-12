import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    query: {},
    pathName: undefined,
    data: {
        sort: undefined,
        typeId: undefined,
        textSearch: undefined,
        nameAccount: undefined,
        typeIdArray: undefined
    },
    canUpdateQuery: false,
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery: (state,action) =>{
            state.query = action.payload
        },
        updateQuery: (state, action) => {
            state.query = {
                ...state.query,
                ...action.payload,
            }
        },
        updateSearchData: (state, action) => {
            state.data = {
                ...state.data,
                ...action.payload,
            }
        },
        setPathName: (state, action) => {
            state.pathName = action.payload
        },
        setSearchData: (state, action) => {
            state.data = action.payload
        },
        setCanUpdateQuery: (state, action) => {
            state.canUpdateQuery = action.payload
        },
        resetSearchData: (state) => {
            state.data = {
                sort: undefined,
                typeId: undefined,
                textSearch: undefined,
                nameAccount: undefined
            }
        },
    }
})

export const {
    setQuery,
    setPathName,
    updateQuery,
    setSearchData,
    setCanUpdateQuery,
    resetSearchData,
    updateSearchData
} = searchSlice.actions

export default searchSlice.reducer