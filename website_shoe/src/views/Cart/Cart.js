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
                showToastSuccess("Sử dụng mã giảm giá thành công")
                setDisabled(true)
            } else {
                if(code) {
                    showToastError("Mã giảm giá đã hết hạn")
                } else {
                    showToastError("Mã giảm giá không hợp lệ")
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    if (cart === undefined) {
        return <p>Loading...</p>
    }

    return (
        <div className="w-full">
            {
                cart?.length ? (
                    <div className="items-start max-w-screen-3xl mx-auto w-full flex">
                        <div className="my-5 w-3/5 px-5 flex-1">
                            <table className="w-full">
                                <thead className="border-b-2 border-gray-300">
                                    <tr className="mb-3">
                                        <th className="text-left pb-3">
                                            Sản phẩm
                                        </th>
                                        {/* <th className="text-center">
                                            Giá
                                        </th> */}
                                        {/* <th className="text-center">
                                            Số lượng
                                        </th> */}
                                        <th className="text-right">
                                            Giá
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart?.map((product, index) => {
                                            return (
                                                <CartRow key={index} product={product} />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <div className="mt-5">
                                <Link to="/danh-muc" className="flex py-1 items-center border-2 border-yellow-1 text-yellow-1 uppercase font-medium w-64 justify-center">
                                    <ArrowLeft width={20} className="mr-1" />
                                    Tiếp tục xem sản phẩm
                                </Link>
                            </div>
                        </div>

                        <div className="w-2/5 px-10 mt-7 mb-5">
                            <div className="border-b-2 border-gray-300 pb-1">
                                <p className="uppercase font-medium text-black">Tổng số lượng</p>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-gray-300">
                                <p>Giao hàng</p>
                                <div className="flex items-end flex-col">
                                    <p className="text-sm-md opacity-80 mb-2">
                                        Giao hàng miễn phí
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b-2 border-gray-300">
                                <p>Tổng</p>
                                <Price
                                    price={totalPrice}
                                    color="black"
                                />
                            </div>

                            <div className="text-black font-medium flex items-center py-3 border-b-2 border-gray-300">
                                <Tag width={20} className="mr-2" />
                                Phiếu ưu đãi
                            </div>

                            <input disabled={disabled} placeholder="Mã ưu đãi" className="p-2 my-3 border border-gray-300 w-full" onChange={(e) => setCode(e.target.value)} />

                            <button
                                disabled={disabled}
                                onClick={handleUseCoupon}
                                className="bg-[#f9f9f9] w-full py-2 border border-gray-300 hover:bg-[#c7c7c7]"
                            >
                                Áp dụng
                            </button>
                            <Link to="/thanh-toan">
                                <div className="text-center w-full py-2 text-white font-medium uppercase bg-[#d26e4b] hover:bg-[#a8583c] my-3">
                                    Tiến hành thanh toán
                                </div>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p className='text-2xl text-center mt-10'>Không có sản phẩm trong giỏ hàng</p>
                )
            }
        </div>
    )
}