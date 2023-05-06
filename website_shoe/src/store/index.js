import { configureStore } from '@reduxjs/toolkit'

import productReducer from './product'
// import userReducer from './user'
// import couponReducer from './coupon'
// import newsReducer from './news'
// import reportReducer from './report'
// import invoiceReducer from './invoice'
// import searchReducer from './search'
const store = configureStore({
    reducer: {
        product: productReducer,
        // user: userReducer,
        // news: newsReducer,
        // report: reportReducer,
        // invoice: invoiceReducer,
        // coupon: couponReducer,
        // search: searchReducer,
    }
})

export default store