import React, { useState } from 'react'
import Container from '../../components/Container/Container'
import Price from '../../components/Price/Price'
import Input from '../../components/Input/Input'
import { formatPrice } from '../../utils/formatPrice'
import { useTotalPrice, useCart } from './../../store/product/hook';
import invoiceApi from './../../api/invoiceApi';
import { showToastError, showToastSuccess } from './../../components/CustomToast/CustomToast';
import { useDispatch } from 'react-redux'

export default function Buy() {
  const totalPrice = useTotalPrice()
  const cart = useCart()

  const [disabled, setDisabled] = useState()
  const dispatch = useDispatch()
  const [address, setAddress] = useState()
  const [phone, setPhone] = useState()
  const [paymentMethod, setPaymentMethod] = useState()
  const userLogin = JSON.parse(localStorage?.getItem('USER_LOGIN'))
  
  const handleOrder = async () => {
    setDisabled(true)
    if(!address){
      showToastError("Vui lòng điền thông tin địa chỉ")
      setDisabled(false)
      return;
    }
    if(!phone){
      showToastError("Vui lòng điền thông tin số điện thoại")
      setDisabled(false)
      return;
    }
    try {
      await invoiceApi.postInvoice({
        userId: userLogin?._id,
        phone,
        address,
        amount: cart?.length,
        cost: totalPrice,
        paymemtMethod: paymentMethod
      })
      
      showToastSuccess("Đặt hàng thành công")
      setDisabled(false)
    } catch (err) {
      console.log(err)
      setDisabled(false)
      showToastError("Đặt hàng thất bại")
    }
  }



  return (
    <div className="bg-white w-full">
      <Container className="py-20 flex justify-center">
        <div className="border-2 border-yellow-1 p-5 w-4/5 flex">
          <div className="w-1/2 px-10">
            <p className="uppercase text-black text-md font-medium">Đơn hàng của bạn</p>

            <div className="flex items-center justify-between text-black text-sm-md font-medium py-3 border-b border-gray-300">
              <p>Tổng</p>
              <Price
                price={formatPrice(totalPrice)}
                color="black"
              />
            </div>

            <div className="flex items-center justify-between text-black text-sm-md font-medium py-3 border-b border-gray-300">
              <p>Giao hàng</p>
              <p className="opacity-50">Giao hàng miễn phí</p>
            </div>

            <div className="flex items-center justify-between text-black text-sm-md font-medium py-3 border-b-2 border-gray-300">
              <p>Tổng Sản Phẩm</p>
              <p className="text-[14px] mr-2">{cart?.length || 0} Sản Phẩm</p>
            </div>
            
            <div className="flex items-center justify-between text-black text-sm-md font-medium py-3 border-b-2 border-gray-300">
              <p>Tổng</p>
              <Price
                price={formatPrice(totalPrice)}
                color="black"
              />
            </div>
          </div>
          <div className="w-1/2 px-10">
            <Input
              className="border border-gray-400 rounded-lg text-md  bg-white text-black"
              id="tien1"
              label="Địa chỉ nhận hàng"
              name="shipping-address"
              dark={1}
              type="tel"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              placeholder="Địa chỉ"
              onChange={(e) => setAddress(e.target.value)}
            />

            <Input
              className="border border-gray-400 rounded-lg text-md  bg-white text-black"
              id="tien2"
              label="Số điện thoại"
              name="phone"
              dark={1}
              type="phone"
              classNameContainer="mt-5"
              placeholder="Số điện thoại"
              onChange={e => setPhone(e.target.value)}
            />
            <ul>
              <li className="py-2 border-b border-gray-300">
                <input id="payment_method_cod" type="radio" name="payment_method" checked="checked" value="COD" onChange={e => setPaymentMethod(e.target.value)}/>
                <label className="ml-2 text-black font-medium text-sm-md" htmlFor="payment_method_cod">Trả tiền khi nhận hàng</label>
                <p className="mt-2 text-sm-md">Trả tiền mặt khi giao hàng</p>

              </li>
              <li className="py-2 ">
                <input id="payment_method_card" type="radio" name="payment_method" value="CARD" onChange={e => setPaymentMethod(e.target.value)} />
                <label className="ml-2 text-black font-medium text-sm-md" htmlFor="payment_method_card">Chuyển khoản ngân hàng</label>
                <p className="mt-2 text-sm-md">Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Vui lòng ghi rõ Mã sản phẩm + Số điện thoại của bạn trong phần Nội dung thanh toán. Đơn hàng sẽ đươc giao sau khi tiền đã chuyển.</p>
              </li>
            </ul>

            <button
              onClick={handleOrder}
              disabled={disabled}
              className="mt-4 px-8 py-2 font-medium uppercase text-white bg-[#d26e4b] hover:bg-[#a8583c]">
              Đặt hàng
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}
