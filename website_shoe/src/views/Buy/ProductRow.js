import React, { useState, useEffect } from 'react'
import Price from '../../components/Price/Price'
export default function ProductRow({ product, quantity }) {

    
    return (
        <tr className="border-b-2 flex items-center">
            <td className="w-4/5 flex items-center py-5">
                <img src={product?.data?.image[0]} alt="product" className="w-[70px] h-[70px] object-cover border rounded-lg shadow-md"/>
                <div className="ml-3">
                    <p className="">{product?.data?.nameProduct}</p>
                </div>
            </td>
            <td className="w-0/5 flex items-center py-5">
                <p>x{quantity}</p>
            </td>

            <td className="w-2/5 text-right">
                <Price
                    price={product?.data?.priceSale}
                    color="black"
                />
            </td>
        </tr>
    )
}
