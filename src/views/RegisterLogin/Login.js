import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Tooltip from '../../components/Tooltip/Tooltip';
import { AlertCircle } from 'react-feather'
import userApi from '../../api/userApi'
import { showToastSuccess, showToastError } from './../../components/CustomToast/CustomToast';
import { useNavigate } from 'react-router-dom'
import { USER_LOGIN } from '../../utils/storage'
import "./Log.scss"
import useDebounce from '../../hooks/useDebounce';

export default function Login() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [emailValidate, setEmailValidate] = useState()

  const navigate = useNavigate()

  const emailDebounce = useDebounce(email, 1000)

  useEffect(() => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(emailDebounce) {
      if (emailDebounce?.match(mailformat)) {
        setIsValidEmail(true)
      }
      else {
        setEmailValidate("Email is not valid")
        setIsValidEmail(false)
      }
    }
  }, [emailDebounce])

  const Login = async (e) => {
    e.preventDefault()
    if (!email) {
      showToastError("Email cannot be blank")
      return;
    }
    if (!password) {
      showToastError("Password cannot be blank")
      return;
    }
    try {
      await userApi.login({email, password}).then((response) => {
        USER_LOGIN.set(JSON.stringify(response?.data?.user))
        showToastSuccess("Login successful")
        if(response?.data?.user?.role !== 'CUSTOMER') {
          navigate("/admin/dashboard")
        } else {
          navigate("/")
        }
      })
    } catch (error) {
      console.log(error)
      showToastError("Incorrect account or password")
    }
  }

  return (
    <div className="log-container w-screen h-screen bg-[url('/public/images/home/login_main2.jpg')] bg-cover bg-center">
      <div className="w-full h-full">
        <div className="log-form w-[500px] mx-auto py-10 rounded-lg">
          <h1 className="text-white text-3xl text-center mb-10 font-medium">LOG IN</h1>
          <form className="">
            <div className="relative  mb-8">
              <input
                className="form-input w-full border px-4 py-3 rounded-lg"
                type="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
              <Tooltip
                className="absolute top-1/2 transform -translate-y-1/2 -right-10 text-red-500"
                classNameTooltip="left-full bottom-1/2 transform translate-y-1/2 translate-x-2"
                tooltip={<p>{emailValidate}</p>}
                isShow={!isValidEmail}
              >
                <AlertCircle />
              </Tooltip>
            </div>

            <div className="relative">
              <input
                className="form-input w-full border px-3 py-3 rounded-lg"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <button
              onClick={(e) => { Login(e) }}
              className="w-full py-3 hover:opacity-90 text-white mt-8 font-medium text-xl rounded-lg bg-[#539556]"
            >
              LOG IN
            </button>
          </form>
          <div className="text-center text-white mt-5">
            <Link to="/register" className="underline">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
