import React, { useState, useEffect } from 'react'
import AdminContainer from '../../../components/AdminContainer/AdminContainer'
import { showToastSuccess, showToastError } from '../../../components/CustomToast/CustomToast';
import { Link, useNavigate  } from 'react-router-dom';
import "./EditProfile.scss"

export default function Category({ user }) {
    const navigate = useNavigate()
   
    return (
      <AdminContainer>
        <div className="userTitleContainer">
          <h1 className="userTitle">Information User</h1>
          <div>
            <Link
              to={{
                pathname: "./changePassWord",
              //   state: { user: user },
              }}
            >
              <button className="userChangePassWord">Change Password</button>
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("USER_LOGIN")
                navigate('/login')
                showToastSuccess("Đăng xuất thành công")
                
                // window.location.reload();
              }}
              className="userLogout"
            >
              Log out
            </button>
          </div>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              {/* <img src={user.imageUrl} alt="" className="userShowImg" /> */}
              <img src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_3.jpg" alt="" className="userShowImg" />

              <div className="userShowTopTitle">
                {/* <span className="userShowUsername">{user.fullname}</span> */}
                {/* <span className="userShowUserTitle">{user.position}</span> */}
                <span className="userShowUsername">
                  Hue Nguyen
                </span>
                <span className="userShowUserTitle">Admin</span>
                
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account</span>
              <div className="userShowInfo">
                {/* <span className="userShowInfoTitle">{user.username}</span> */}
                <span className="userShowInfoTitle">Hue Nguyen</span>

              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                  {/* {formatDate(user.birthday)} */}
                </span>
              </div>
              <span className="userShowTitle">Contact</span>
              <div className="userShowInfo">
                {/* <span className="userShowInfoTitle">{user.phone}</span> */}
                <span className="userShowInfoTitle">0962267888</span>

              </div>
              <div className="userShowInfo">
                {/* <span className="userShowInfoTitle">{user.email}</span> */}
                <span className="userShowInfoTitle">nguyentanhue@gmail.com</span>

              </div>
              
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Update</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                  //   value={userUpdate.fullname}
                  //   onChange={handleUpdateUser}
                  //   placeholder={user.fullname}
                  placeholder={"Hue Nguyen"}

                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone Number</label>
                  <input
                    name="phone"
                    type="phone"
                  //   value={userUpdate.phone}
                  //   placeholder={user.phone}
                    placeholder={"0962267888"}

                    onChange={(e) => {
                      const re = /^[0-9\b]+$/;

                      // if value is not blank, then test the regex

                      // if (e.target.value === "" || re.test(e.target.value)) {
                      //   setUserUpdate((prev) => {
                      //     return { ...prev, phone: e.target.value };
                      //   });
                      // }
                    }}
                    className="userUpdateInput"
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    name="email"
                    type="text"
                    placeholder={"nguyentanhue@gmail.com"}
                    className="userUpdateInput"
                  />
                </div>
                
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  {/* <img
                    onClick={() => {
                      inputAvatarRef.current.click();
                    }}
                    className="userUpdateImg"
                    src={avatar ? URL.createObjectURL(avatar) : user.imageUrl}
                    alt=""
                  /> */}
                  <img  src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_3.jpg" alt="" className='userUpdateImg'/>

                  <label htmlFor="file"></label>
                  <input
                  //   onChange={onImageChange}
                    accept="image/png, image/gif, image/jpeg"
                  //   ref={inputAvatarRef}
                    type="file"
                    style={{ display: "none" }}
                  />
                </div>
                <button
                  // onClick={handleSubmitFormUpdate}
                  className="userUpdateButton"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>

      </AdminContainer>
    )
}
