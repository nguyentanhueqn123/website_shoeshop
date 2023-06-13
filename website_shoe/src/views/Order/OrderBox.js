import React, { useState, useEffect } from 'react'
import { useFetchProducts, useProducts, useFetchAllProductType} from '../../store/product/hook'
import { formatDDMMYYYYHHmm } from '../../utils/formatDatetime'
import Price from '../../components/Price/Price'



export default function OrderBox({invoice}) {
  const products = useProducts()
  const userLogin = JSON.parse(localStorage?.getItem('USER_LOGIN'))

  // products?.data.forEach(product => {
  //   console.log(product._id)
  // })
  // console.log("===== sp: ", products?.data[0].nameProduct);

  useFetchProducts()
  useFetchAllProductType()

    return (
        <div className="flex border bg-white rounded-lg p-4 mb-4">
            <div className="w-2/5">
                <p>
                {invoice.product.map((productId, index) => {
                    const product = products?.data.find(p => p._id === productId);
                    if (product) {
                      return <a href={`/san-pham/${product._id}`} className="flex items-center mb-2" key={index}>
                        <img className="w-[70px] h-[70px] border object-cover rounded-md shadow-sm" src={product.image} alt="imageProduct" />
                        <div className="ml-2">
                            <p className="">{product.nameProduct}</p>
                            <Price
                                price={product?.priceSale}
                                priceDel={product?.price}
                                color="black"
                                className="text-[1rem]"
                            />
                        </div>
                      </a>
                    }
                })}
                </p>
            </div>
            <div className="w-2/5">
                <p>ID: {invoice?._id}</p>
                <p>
                Total Quanlity: 
                {invoice?.amount}
                </p>
                <p>
                <i className="fa-solid fa-tag"></i>
                Total Price:
                {invoice?.cost}
                </p>
                <p>
                Time Order:
                {formatDDMMYYYYHHmm(invoice?.time)}
                </p>
                <p>
                Payment Method:
                {invoice?.paymentMethod}
                </p>
            </div>
            <div className="w-1/5 border-l-2 pl-3">
                <p className="uppercase font-bold mb-2 text-[#62B4FF]">Delivery Address</p>
                {
                    userLogin?.nameAccount
                }
                <div className="flex items-center mt-1">
                    <i className="fa-solid fa-mobile-screen-button text-[#62B4FF]"></i>
                    <p className="ml-2 text-gray-500">
                    {invoice?.phone}
                    </p>
                </div>
                
                <div className="flex items-center mt-1">
                    <i className="fa-sharp fa-solid fa-location-dot text-[#62B4FF]"></i>
                    <p className="ml-2 text-gray-500">
                    {invoice?.address}
                    </p>
                </div>
            </div>
            
        </div>
    )
}
