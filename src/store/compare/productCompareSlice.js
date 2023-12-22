import { createSlice } from '@reduxjs/toolkit';

export const productCompareSlice = createSlice({
  name: 'productCompare',
  initialState: {
    selectedProduct: {
      name: null,
      image: null,
      price: null,
      priceSale: null,
      metal: null,
      size: null,
      description: null,
      sale: null,


    },
  },
  reducers: {
    selectProductCompare: (state, action) => {
      state.selectedProduct.name = action.payload.name;
      state.selectedProduct.image = action.payload.image;
      state.selectedProduct.price = action.payload.price;
      state.selectedProduct.priceSale = action.payload.priceSale;
      state.selectedProduct.metal = action.payload.metal;
      state.selectedProduct.description = action.payload.description;
      state.selectedProduct.sale = action.payload.sale;
      state.selectedProduct.size = action.payload.size;



    },
  },
});

export const { selectProductCompare } = productCompareSlice.actions;

export default productCompareSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// export const productCompareSlice = createSlice({
//   name: 'productCompare',
//   initialState: {
//     selectedProduct: null,
   
//   },
//   reducers: {
//     selectProductCompare: (state, action) => {
//       state.selectedProduct = action.payload;
//     },
//   },
// });

// export const { selectProductCompare } = productCompareSlice.actions;

// export default productCompareSlice.reducer;