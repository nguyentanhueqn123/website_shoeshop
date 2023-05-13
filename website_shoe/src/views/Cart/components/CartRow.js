import React, { useState, useEffect } from 'react'
import Price from '../../../components/Price/Price'
import { X } from 'react-feather'
import { deleteCart } from '../../../utils/addtoCart'
import { fetchUser } from '../../../store/user'
import { useDispatch } from 'react-redux'
import userApi from '../../../api/userApi'
export default function CartRow({ product }) {

    const [inputValue, setInputValue] = useState(1)
 
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
        if (inputValue === 1) {
            return
        }
        setInputValue(inputValue - 1)

        try {
            await userApi.deleteCart(userLogin?._id, product?.data?._id)
            dispatch(fetchUser(userLogin?._id))
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <tr>
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
                <img src={product?.data?.image[0]} alt="product" width={100} height={100} />
                <p className="opacity-80 ml-3">{product?.data?.nameProduct}</p>
            </td>
            {/* <td>
                <Price
                    price={product?.data?.priceSale}
                    color="black"
                />
            </td> */}

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
                    price={inputValue * product?.data?.priceSale}
                    color="black"
                />
            </td>
        </tr>
    )
}
