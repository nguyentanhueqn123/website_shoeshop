import React from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../../components/CartIcon/CartIcon'
import Price from '../../components/Price/Price'
import { formatPrice } from '../../utils/formatPrice'
import { addToCart } from '../../utils/addtoCart';
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../store/user'
import { useUser } from '../../store/user/hook'
import '../../styles/cardProduct.scss'

export default function ProductCardV2({ product }) {
    const dispatch = useDispatch()
    const userLogin = JSON.parse(localStorage?.getItem('USER_LOGIN'))
    const user = useUser()

    return (
        <div className="flex flex-col bg-white relative group product-card-container">
            <a className="flex flex-col justify-center items-center shadow-lg" href={`/san-pham/${product?._id}`}>
                <div className="relative w-[281px] h-[281px] top-[-32px]">
                    {product?.image?.[0] && <img src={product?.image?.[0]} alt="product" className="image-product w-full h-full absolute top-0 opacity-100 transition-opacity duration-800 ease-linear object-cover" />}
                    {/* {product?.image?.[1] && <img src={product?.image?.[1]} alt="product" className="w-full h-full absolute top-0 opacity-0 transition-opacity duration-1000 ease-linear group-hover:opacity-100" />} */}
                </div>
                <div className="px-3 text-center">
                    <p className="text-[#334862] font-bold hover:text-black text-[18px] mt-2">
                        {product?.nameProduct}
                    </p>
                    <Price
                        className="mb-3"
                        price={product?.priceSale}
                        priceDel={product?.price}
                        color="black"
                    />
                </div>
            </a>

            <CartIcon
                className="w-full bottom-20 flex justify-center items-center cursor-pointer group-hover:opacity-100"
                onClick={async () => {
                    await addToCart(userLogin?._id, product?._id)
                    await dispatch(fetchUser(userLogin?._id))
                }}
                isInCart = {user?.data?.cart?.includes(product?._id)}
            />
        </div>
    )
}
