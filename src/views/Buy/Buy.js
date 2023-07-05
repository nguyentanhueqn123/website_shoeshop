import React, { useState, useEffect } from 'react'
import Container from '../../components/Container/Container'
import Price from '../../components/Price/Price'
import Input from '../../components/Input/Input'
import { formatPrice } from '../../utils/formatPrice'
import { useTotalPrice, useCart } from './../../store/product/hook';
import invoiceApi from './../../api/invoiceApi';
import ProductRow from "./ProductRow"
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
    setDisabled(true);
    if (!address) {
      showToastError("Please fill in your address information");
      setDisabled(false);
      return;
    }
    if (!phone) {
      showToastError("Please fill in your phone number");
      setDisabled(false);
      return;
    }
    try {
      const productIds = cart?.map((product) => product.data._id);
      await invoiceApi.postInvoice({
        userId: userLogin?._id,
        phone,
        address,
        amount: cart?.length,
        cost: totalPrice,
        paymentMethod: paymentMethod,
        product: productIds, // add productIds here
      });
  
      showToastSuccess("Order successfully");
      setDisabled(false);
    } catch (err) {
      console.log(err);
      setDisabled(false);
      showToastError("Order failed !");
    }
  };
  const productIds = cart?.map((product) => product.data._id);
  console.log("========>",productIds);
 

   // lọc id trùng theo sp
   const getUniqueProducts = (products) => {
    let uniqueProducts = products?.reduce((accumulator, currentProduct) => {
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


  return (
    <div className="bg-white w-full">
      <Container className="py-6 mb-10 flex justify-center">
        <div className="border rounded-lg shadow-lg py-5 w-4/5 flex">
          <div className="w-1/2 pl-10">
            <p className="uppercase text-black text-lg font-medium">About your order</p>

            <div className="flex items-center justify-between text-black text-md font-medium py-3 border-b-2 border-gray-300">
              <p>Total Product:</p>
              <p>{cart?.length || 0} Products</p>
            </div>
            {
              getUniqueProducts(cart)?.map((product, index) => {
                return (
                    <ProductRow key={index} product={product} quantity={getProductQuantity(product.data._id)} />
                )
              })
            }
            
            <div className="flex items-center justify-between text-black text-md font-medium py-3">
              <p>Total Price:</p>
              <Price
                price={formatPrice(totalPrice)}
                color="black"
              />
            </div>
            <div className="flex items-center justify-between text-black text-md font-medium">
              <p>Delivery:</p>
              <p className="opacity-50">Free Shipping</p>
            </div>
          </div>
          <div className="w-1/2 px-10 mt-10">
            <Input
              className="border border-gray-400 rounded-lg text-md bg-white text-black"
              id="tien1"
              label="Delivery Address"
              name="shipping-address"
              dark={1}
              type="tel"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              placeholder="Your address"
              onChange={(e) => setAddress(e.target.value)}
            />

            <Input
              className="border border-gray-400 rounded-lg text-md  bg-white text-black"
              id="tien2"
              label="Phone Number"
              name="phone"
              dark={1}
              type="phone"
              classNameContainer="mt-5"
              placeholder="Your phone number"
              onChange={e => setPhone(e.target.value)}
            />
            <ul>
              <li className="mt-5 uppercase font-bold text-gray-500">Payment Method</li>
              <li className="py-2 border-b border-gray-300">
                <input id="payment_method_cod" type="radio" name="payment_method" checked="checked" value="COD" onChange={e => setPaymentMethod(e.target.value)}/>
                <label className="ml-2 text-black font-medium text-sm-md" htmlFor="payment_method_cod">COD</label>
                <p className="mt-2 text-sm-md">Cash On Delivery</p>

              </li>
              <li className="py-2 ">
                <input id="payment_method_card" type="radio" name="payment_method" value="CARD" onChange={e => setPaymentMethod(e.target.value)} />
                <label className="ml-2 text-black font-medium text-sm-md" htmlFor="payment_method_card">With CARD</label>
                <p className="flex mt-2">
                  <img className="w-[100px] h-[40px] object-cover" src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/363_Visa_Credit_Card_logo-512.png" alt="" />
                  <img className="w-[100px] h-[40px] object-cover" src="https://static.vecteezy.com/system/resources/previews/009/469/637/original/paypal-payment-icon-editorial-logo-free-vector.jpg" alt="" />
                  <img className="w-[100px] h-[40px] object-cover ml-2 scale-110" src="https://developers.momo.vn/v3/vi/assets/images/logo-custom2-57d6118fe524633b89befe8cb63a3956.png" alt="" />
                </p>
              </li>
            </ul>

            <button
              onClick={handleOrder}
              disabled={disabled}
              className="text-center rounded-lg w-full py-2 text-white font-medium uppercase bg-[#62B4FF] hover:bg-[#349eff] my-4">
              Order Now
            </button>
          </div>
        </div>
      </Container>
    </div>
  )
}
