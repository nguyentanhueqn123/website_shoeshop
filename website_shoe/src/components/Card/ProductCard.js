import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/cardProduct.scss'
import { ADD_ITEM_TO_JUST_VIEW } from '../../utils/storage'
import Price from '../../components/Price/Price'

export default function ProductCard({ product }) {
    return (
        <Link to={`/san-pham/${product?._id}`}>
         <div
         className="w-full h-[350px] flex flex-col text-center bg-white product-card-container"
         onClick={() => {
             ADD_ITEM_TO_JUST_VIEW.set(product)
         }}
         >
            <div className="h-[260px] relative group top-[-32px]">
                {product?.image?.[0] && <img src={product?.image?.[0]} alt="product" className="image-product w-full h-full absolute top-0 opacity-100 transition-opacity duration-800 ease-linear object-cover" />}
            </div>
            <div className="text-[#334862] font-bold hover:text-black text-[18px] mt-2">{product?.nameProduct}</div>
            <Price 
                price={product?.priceSale}
                priceDel={product?.price}
                color="black"
            />
            <div className="container-title ">
                <p className='title-buy opacity-100 transition-opacity duration-800 ease-linear'>BUY NOW</p>
            </div>
           
        </div>

        </Link>
       

    )
}