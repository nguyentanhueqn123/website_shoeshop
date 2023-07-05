import React, { useState, useEffect } from 'react'
import Price from '../../../components/Price/Price'
import { X, Archive } from 'react-feather'
import { deleteCart } from '../../../utils/addtoCart'
import { fetchUser } from '../../../store/user'
import { useDispatch } from 'react-redux'
import userApi from '../../../api/userApi'
export default function CartRow({ product, quantity}) {

    const [inputValue, setInputValue] = useState(quantity)
 
    const userLogin = JSON.parse(localStorage?.getItem('USER_LOGIN'))
    const dispatch = useDispatch()


    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleIncrease = async (e) => {
        e.preventDefault()
        setInputValue(inputValue + 1)
        try {
            await userApi.addCart(userLogin?._id, product?.data?._id)
            dispatch(fetchUser(userLogin?._id))
        } catch (err) {
            console.log(err)
        }
    }
    const handleDecrease = async (e) => {
        e.preventDefault()
        if (inputValue <= 1) {
            return
        }
        setInputValue(inputValue - 1)

        // try {
        //     await userApi.updateProductQuantity(userLogin?._id, product?.data?._id, inputValue - 1)
        //     dispatch(fetchUser(userLogin?._id))
        // } catch (err) {
        //     console.log(err)
        // }
        
    }
    
    return (
        <tr className="border-b-2">
            <td className="flex items-center py-5">
                <button
                    onClick={async () => {
                       await deleteCart(userLogin?._id, product?.data?._id)
                       await dispatch(fetchUser(userLogin?._id))
                    }}
                    className="flex items-center justify-center mr-2"
                >
                    <X width={15} />
                </button>
                <img src={product?.data?.image[0]} alt="product" width={90} height={90} />
                <div className="h-full ml-3">
                    <p className="">{product?.data?.nameProduct}</p>
                    <div className="flex items-center mt-2 opacity-60">
                        <Archive className="w-[1rem] h-[1rem] text-[#62B4FF]"/>
                        <p className="text-sm ml-1">7 days free return</p>
                    </div>
                </div>
                
            </td>
            {/* <td>
                <Price
                    price={product?.data?.priceSale}
                    color="black"
                />
            </td> */}
            <td>
                <p>Quantity: {quantity}</p>
            </td>

            {/* <td>
                <form className="flex items-center">
                    <button className="bg-[#f9f9f9] px-2 py-2 border border-gray-300"
                        onClick={e => handleDecrease(e)}
                    >
                        -
                    </button>
                    <input value={inputValue} className="w-8 py-2 text-center border border-gray-300" onChange={handleInputChange} />
                    <button
                        className="bg-[#f9f9f9] px-2 py-2 border border-gray-300"
                        onClick={(e) => handleIncrease(e)}
                    >
                        +
                    </button>
                </form>
            </td> */}
            <td className="text-right">
                <Price
                    price={product?.data?.priceSale}
                    priceDel={product?.data?.price}
                    color="black"
                />
            </td>
        </tr>
    )
}
