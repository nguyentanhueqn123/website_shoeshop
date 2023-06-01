import React, { useState, useEffect } from 'react'
import Container from '../../components/Container/Container'
import { Tag, ArrowLeft } from 'react-feather'
import Price from '../../components/Price/Price'
import { Link } from 'react-router-dom'
import productApi from './../../api/productApi';
import { fetchUser } from './../../store/user/index'
import { fetchProduct, setTotalPriceRedux, setCart } from './../../store/product/index'
import { useCart } from '../../store/product/hook'
import { useUser } from './../../store/user/hook'
import { useDispatch } from 'react-redux'
import CartRow from './components/CartRow'
import couponApi from './../../api/couponApi';
import { showToastError, showToastSuccess } from './../../components/CustomToast/CustomToast';

export default function Cart() {
 
    const dispatch = useDispatch()

    const [totalPrice, setTotalPrice] = useState()
    const [code, setCode] = useState()
    const [disabled, setDisabled] = useState(false)
    const cart = useCart()

    useEffect(() => {
        const total = cart?.reduce((total, product) => total + product?.data?.priceSale, 0)
        setTotalPrice(total)
        dispatch(setTotalPriceRedux(total))
    }, [cart])

    const handleUseCoupon = async () => {
        try {
            const coupon = await couponApi.getCouponByCode(code)
            await couponApi.editCoupon(coupon?.data?.[0]?._id, {
                amount: coupon?.data?.[0]?.amount - 1
            })
            if (coupon?.data?.[0]?.status === 'ACTIVE') {
                const total = totalPrice - totalPrice * coupon?.data?.[0]?.value / 100
                setTotalPrice(total)
                dispatch(setTotalPriceRedux(total))
                showToastSuccess("Use Coupon code Successfully")
                setDisabled(true)
            } else {
                if(code) {
                    showToastError("Expired Coupon code !")
                } else {
                    showToastError("Invalid Coupon code !")
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    // lọc id trùng theo sp
    const getUniqueProducts = (products) => {
        const uniqueProducts = products.reduce((accumulator, currentProduct) => {
            if (!accumulator.find(product => product.data._id === currentProduct.data._id)) {
                accumulator.push(currentProduct);
            }
            return accumulator;
        }, []);
        return uniqueProducts;
    }

    const getProductQuantity = (productId) => {
        const productCount = cart.filter(product => product.data._id === productId).length;
        return productCount;
    }

    if (cart === undefined) {
        return <p className='h-full flex justify-center justify-items-center mt-4'>Loading...</p>
    }

    return (
        <div className="max-w-screen-xl mx-auto">
            {
                cart?.length ? (
                    <div className="items-start max-w-screen-3xl mx-auto w-full flex my-6">
                        <div className="w-2/3 p-6 mr-5 flex-1 border rounded-lg shadow-lg">
                            <table className="w-full">
                                <thead className="border-b-2 border-gray-300">
                                    <tr className="mb-3">
                                        <th className="text-left pb-3 uppercase text-lg font-medium">
                                            products in cart
                                        </th>
                                        <th className="text-right">
                                            
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getUniqueProducts(cart)?.map((product, index) => {
                                            return (
                                                <CartRow key={index} product={product} quantity={getProductQuantity(product.data._id)} />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <div className="mt-5">
                                <Link to="/danh-muc" className="flex py-2 w-60 justify-center items-center text-[#62B4FF] border-[#62B4FF] border-2 rounded-lg uppercase font-medium hover:bg-[#62B4FF] hover:text-white">
                                    <ArrowLeft width={20} className="mr-1" />
                                    continue shopping
                                </Link>
                            </div>
                        </div>

                        <div className="w-1/3 p-6 border rounded-lg shadow-lg">
                            <div className="flex items-center justify-between py-2">
                                <p>Total Amount:</p>
                                <div className="flex items-end flex-col">
                                    <p className="text-sm-md opacity-80 mb-2">
                                        {cart?.length || 0} Product
                                    </p>
                                </div>

                            </div>
                            <div className="flex items-center justify-between py-2">
                                <p>Delivery:</p>
                                <div className="flex items-end flex-col">
                                    <p className="text-sm-md opacity-80 mb-2">
                                        Free shipping
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b-2 border-gray-300">
                                <p>Total Price:</p>
                                <Price
                                    price={totalPrice}
                                    color="black"
                                />
                            </div>

                            <div className="text-black font-medium flex items-center py-3 border-gray-300">
                                <Tag width={20} className="mr-2" />
                                DISCOUNT COUPONS
                            </div>

                            <div className="flex w-full">
                                <input disabled={disabled} placeholder="Enter ID code" className="w-4/5 rounded-lg p-2 border border-gray-300 mr-2" onChange={(e) => setCode(e.target.value)} />
                                <button
                                    disabled={disabled}
                                    onClick={handleUseCoupon}
                                    className="w-1/5 bg-[#f9f9f9] rounded-lg border border-gray-300 hover:bg-[#62B4FF] hover:text-white"
                                >
                                    Apply
                                </button>
                            </div>
                            <Link to="/thanh-toan">
                                <div className="text-center rounded-lg w-full py-2 text-white font-medium uppercase bg-[#62B4FF] hover:bg-[#349eff] my-4">
                                    Buy Now
                                </div>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className=" text-[#777] flex flex-col w-full items-center justify-center">
                        <img className="flex w-[80px] h-[80px] mt-8" src="/images/icon/bags.png" alt="" />
                        <Link to="/danh-muc">
                            <p className="text-2xl text-center mt-2">No product in the cart! Shopping now</p>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}