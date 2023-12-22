import { createSlice } from '@reduxjs/toolkit';

export const productCompareSlice = createSlice({
  name: 'productCompare',
  initialState: {
    selectedProduct: {
      name: null,
      image: null,
    },
  },
  reducers: {
    selectProductCompare: (state, action) => {
      state.selectedProduct.name = action.payload.name;
      state.selectedProduct.image = action.payload.image;
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