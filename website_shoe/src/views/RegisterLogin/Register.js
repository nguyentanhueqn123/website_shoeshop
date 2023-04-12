import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import useDebounce from '../../hooks/useDebounce';
import userApi from '../../api/userApi';
import { showToastSuccess, showToastError } from '../../components/CustomToast/CustomToast';
// import Tooltip from '../../components/Tooltip/Tooltip';
import { AlertCircle } from 'react-feather'


export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [nameAccount, setNameAccount] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [phone, setPhone] = useState()
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [emailValidate, setEmailValidate] = useState()
  
  // const emailDebounce = useDebounce(email, 1000)
  // console.log(emailDebounce)

  // useEffect(() => {
  //   let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  //   if (emailDebounce) {
  //     if (emailDebounce?.match(mailformat)) {
  //       setIsValidEmail(true)
  //     }
  //     else {
  //       setEmailValidate("Email không hợp lệ")
  //       setIsValidEmail(false)
  //     }
  //   }
  // }, [emailDebounce])

  const handleRegis = async (e) => {
    e.preventDefault();
    if (!nameAccount) {
      showToastError("Tên không được để trống")
      return
    }
    if (!email) {
      showToastError("Email không được để trống")
      return
    }
    if (!phone) {
      showToastError("Số điện thoại không được để trống")
      return
    }
    if (!password) {
      showToastError("Mật khẩu không được để trống")
      return
    }
    if(password !== confirmPassword) {
      showToastError("Xác nhận mật khẩu không chính xác")
      return
    }
    try {
      if (password === confirmPassword) {
        await userApi.register({
          email,
          nameAccount,
          password,
          phone
        })
        showToastSuccess("Đăng kí tài khoản thành công")
        navigate('/dang-nhap')
      }
    } catch (error) {
      console.log(error)
      showToastError("Đăng kí tài khoản thất bại")
    }


  }

  return (
    <div className="w-screen h-screen bg-[url('/public/images/home/bg_nhanxet.png')] bg-cover bg-center">
      <div className="w-full h-full bg-dark">
        <div className="max-w-[500px] px-2 mx-auto py-20">
          <h1 className="text-white text-4xl text-center mb-10 font-medium">Đăng kí</h1>
          <form className="">
            <input
              className="w-full border border-gray-300 px-3 py-3 mb-5"
              type="text"
              placeholder="Name"
              onChange={e => setNameAccount(e.target.value)}
            />
            <div className="relative mb-5">
              <input
                className="w-full border border-gray-300 px-3 py-3"
                type="email"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
              />
              {/* <Tooltip
                className="absolute top-1/2 transform -translate-y-1/2 -right-10 text-red-500"
                classNameTooltip="left-full bottom-1/2 transform translate-y-1/2 translate-x-2"
                tooltip={<p>{emailValidate}</p>}
                isShow={!isValidEmail}
              > */}
                <AlertCircle />
              {/* </Tooltip> */}
           </div>
            <input
              className="w-full border border-gray-300 px-3 py-3 mb-5"
              type="text"
              placeholder="Phone"
              onChange={e => setPhone(e.target.value)}
            />
            <input
              className="w-full border border-gray-300 px-3 py-3 mb-5"
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
            />
            <input
              className="w-full border border-gray-300 px-3 py-3 mb-5"
              type="password"
              placeholder="Confirm Password"
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button 
              onClick={handleRegis}
            className="w-full py-3 bg-black-1 hover:bg-black-2 text-white mt-8 font-medium text-xl">Đăng kí</button>
          </form>
          <div className="text-center text-white mt-5">
            <Link to="/dang-nhap" className="underline">Đăng nhập</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
