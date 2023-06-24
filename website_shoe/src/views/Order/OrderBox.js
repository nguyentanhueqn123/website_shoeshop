import React, { useState, useEffect } from 'react'
import { useFetchProducts, useProducts, useFetchAllProductType} from '../../store/product/hook'
import { formatDDMMYYYYHHmm } from '../../utils/formatDatetime'
import Price from '../../components/Price/Price'
import "./OrderBox.scss"



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
        <div className="flex border bg-white rounded-lg p-6 mb-4">
            <div className="w-2/5">
                <p>
                    {invoice.product.map((productId, index) => {
                        const product = products?.data.find((p) => p._id === productId);
                        if (product) {
                            // Check if the current product ID is the same as the previous one
                            if (index > 0 && productId === invoice.product[index - 1]) {
                            return null; // If so, return null to skip rendering this product
                            }

                            // Get the quantity of this product
                            const quantity = invoice.product.filter((id) => id === productId).length;

                            return (
                            <a href={`/san-pham/${product._id}`} className="flex items-center mb-3" key={index}>
                                <div className="w-full flex justify-between items-center container-box">
                                    <div className="flex">
                                        <img className="w-[70px] h-[70px] border object-cover rounded-md shadow-sm" src={product.image} alt="imageProduct" />
                                        <div className="ml-2">
                                            <p className="mt-[-2px]">{product.nameProduct}</p>
                                            <Price price={product?.priceSale} priceDel={product?.price} color="black" className="text-[1rem]" />
                                            <span className="ml-1 text-gray-500">x {quantity}</span> {/* Display the quantity */}
                                        </div>
                                    </div>
                                    {invoice.status === 'DELIVERED' && (
                                        <button className="bg-[#62B4FF] h-10 rounded-lg px-3 text-white hover:bg-[#349eff] btn-buy">
                                            Review
                                        </button>
                                    )}

                                    {/* <button className="bg-[#62B4FF] h-10 rounded-lg px-3 text-white opacity-100 hover:bg-[#349eff] btn-buy">Review</button> */}
                                </div>
                            </a>
                            );
                        }
                    })}
                </p>
            </div>
            <div className="w-3/5 ml-3 flex px-6 py-2 rounded-lg border shadow-md overflow-hidden">
                <div className="w-1/2">
                    <p className="w-full py-3 border-b-2 uppercase text-[#62B4FF] font-bold">Desciption</p>
                    <div className="">
                        <p className="mt-4">
                            <span className="text-gray-500 mr-1">ID order:</span>
                            {invoice?._id.slice(0, 2)}{invoice?._id?.slice(invoice._id?.length - 2, invoice?._id?.length)}
                        </p>
                        <p className="mt-1">
                            <span className="text-gray-500">Total Quanlity:</span>
                            <span className="ml-1">{invoice?.amount}</span>
                        </p>
                        <p className="mt-1 ">
                            <span className="text-gray-500">Amount due:</span>
                            <span className="ml-1 font-bold text-red-500">{invoice?.cost} đ</span>
                        </p>
                        <p className="mt-4">
                            <i className="fa-solid fa-calendar-days mr-2 text-[#62B4FF]"></i>
                            Time Order:
                            <span className="ml-1">{formatDDMMYYYYHHmm(invoice?.time)}</span>
                        </p>
                        <p className="mt-1 mb-2">
                            <i className="fa-solid fa-credit-card mr-2 text-[#62B4FF]"></i>
                            Payment Method:
                            <span className="ml-1">{invoice?.paymentMethod}</span>
                        </p>
                    </div>
                </div>
                <div className="w-1/2 ml-3">
                    <p className="w-full px-6 py-3 border-b-2 uppercase text-[#62B4FF] font-bold">Delivery Address</p>

                    <div className="px-6 py-5">
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
                
            </div>
            
            
        </div>
    )
}
