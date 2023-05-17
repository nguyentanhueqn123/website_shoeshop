import React from 'react'
import userApi from '../api/userApi'

import { showToastError, showToastSuccess } from '../components/CustomToast/CustomToast';

export const addToCart = async (id, productId) => {
  try {
    await userApi.addCart(id, productId)
    showToastSuccess("Product added to cart successfully")
  } catch (err) {
    console.log(err)
    showToastError("Add product to cart failed")
  }
}

export const deleteCart = async (id, productId) => {
  try {
    await userApi.deleteCart(id, productId)
    showToastSuccess("Delete product successfully")
  } catch (err) {
    console.log(err)
    showToastError("Delete failed products")
  }
}