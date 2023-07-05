import React, { useState } from 'react'
import Input from '../../../components/Input/Input'
import AdminContainer from '../../../components/AdminContainer/AdminContainer'
import couponApi from '../../../api/couponApi'
import Button from '../../../components/Button/Button'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { showToastError, showToastSuccess } from './../../../components/CustomToast/CustomToast';

export default function AddCoupon() {

    const [name, setName] = useState()
    const [amount, setAmount] = useState()
    const [value, setValue] = useState()
   const [code, setCode] = useState()
    const [pending, setPending] = useState(false)
    const [endDate, setEndDate] = useState(Date.now);

    const handleChangeDate = (date) => {
        setEndDate(date)        
    }

    const resetInput = () => {
        setName('')
        setCode('')
        setValue('')
        setAmount('')
    }


    const handleAddProduct = async (e) => {
        e.preventDefault()
        setPending(true)
        try {
            await couponApi.postCoupon({
                name,
                code,
                value,
                amount,
                endDate: new Date(endDate).toISOString()
            })
            setPending(false)
            resetInput()
            showToastSuccess("Added discount code successfully")
        } catch (error) {
            console.log(error)
            showToastError("Failed to add discount code")
        }
    }

    return (
        <AdminContainer>
            <form>
                <Input
                    className="border border-gray-400 rounded-lg text-md text-black"
                    label="Coupon Name"
                    name="coupon-name"
                    dark={1}
                    type="text"
                    value={name}
                    placeholder="Coupon name"
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    className="border border-gray-400 rounded-lg text-md text-black"
                    label="Coupon code"
                    name="coupon-code"
                    dark={1}
                    type="text"
                    placeholder="Coupon code"
                    classNameContainer="mt-5"
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                />

                <Input
                    className="border border-gray-400 rounded-lg text-md text-black"
                    label="Coupon Amount"
                    name="coupon-amount"
                    dark={1}
                    type="number"
                    placeholder="Coupon Amount"
                    classNameContainer="mt-5"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    min="1"
                    max="100"
                />

                <Input
                    className="border border-gray-400 rounded-lg text-md text-black"
                    label="Coupon Value"
                    name="coupon-value"
                    dark={1}
                    type="number"
                    placeholder="Coupon Value"
                    classNameContainer="mt-5"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    min="1"
                    max="100"
                />

                <p className="mb-3 mt-5">
                    End Day
                </p>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => handleChangeDate(date)}
                    dateFormat="Pp"
                    className="text-black"
                    inline
                    locale="es"
                />
                <Button
                    onClick={(e) => handleAddProduct(e)}
                    pending={pending}
                    isLoading={pending}
                >
                    Add Coupon
                </Button>
            </form>
        </AdminContainer>
    )
}
