import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/cardProduct.scss'
import { ADD_ITEM_TO_JUST_VIEW } from '../../utils/storage'
import Price from '../../components/Price/Price'

export default function ProductCard({ product }) {
    return (
        <div
         className="w-full h-[350px] flex flex-col text-center bg-white product-card-container"
         onClick={() => {
             ADD_ITEM_TO_JUST_VIEW.set(product)
         }}
         >
            <Link to={`/san-pham/${product?._id}`} className="h-[270px] relative group">
                {product?.image?.[0] && <img src={product?.image?.[0]} alt="product" className="w-full h-full absolute top-0 group-hover:opacity-0 opacity-100 transition-opacity duration-1000 ease-linear" />}
               {
                    product?.image?.[1] && <img src={product?.image?.[1]} alt="product" className="w-full h-full absolute top-0 opacity-0 transition-opacity duration-1000 ease-linear group-hover:opacity-100" />
               }
            </Link>
            <Link to={`/san-pham/${product?._id}`} className="text-[#334862] hover:text-black text-sm-md font-medium mt-2">{product?.nameProduct}</Link>
            <Price 
                price={product?.priceSale}
                priceDel={product?.price}
                color="black"
            />
        </div>

    )
}