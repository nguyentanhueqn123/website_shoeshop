import { configureStore } from '@reduxjs/toolkit'

import productReducer from './product'
import searchReducer from './search'
import userReducer from './user'
import couponReducer from './coupon'
// import newsReducer from './news'
// import reportReducer from './report'
import invoiceReducer from './invoice'

import productCompareSlice from './compare/productCompareSlice'
const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        // news: newsReducer,
        // report: reportReducer,
        invoice: invoiceReducer,
        coupon: couponReducer,
        search: searchReducer,
        productCompare: productCompareSlice,
    }
})

export default store