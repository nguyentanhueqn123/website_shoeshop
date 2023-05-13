import React from 'react'
import userApi from '../api/userApi'

import { showToastError, showToastSuccess } from '../components/CustomToast/CustomToast';

export const addToCart = async (id, productId) => {
  try {
    await userApi.addCart(id, productId)
    showToastSuccess("Thêm sản phẩm vào giỏ hàng thành công")
  } catch (err) {
    console.log(err)
    showToastError("Thêm sản phẩm vào giỏ hàng thất bại")
  }
}

export const deleteCart = async (id, productId) => {
  try {
    await userApi.deleteCart(id, productId)
    showToastSuccess("Xóa sản phẩm khỏi giỏ hàng thành công")
  } catch (err) {
    console.log(err)
    showToastError("Xóa sản phẩm khỏi giỏ hàng thất bại")
  }
}