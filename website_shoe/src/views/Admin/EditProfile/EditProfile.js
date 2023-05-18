import React, { useState, useEffect } from 'react'
import AdminContainer from '../../../components/AdminContainer/AdminContainer'
import { showToastSuccess, showToastError } from '../../../components/CustomToast/CustomToast';
import { Link, useNavigate  } from 'react-router-dom';
import "./EditProfile.scss"
import { useUpdateQuery, useSearchData, useUpdateSearch } from '../../../store/search/hook'
import { useFetchUsers, useUsers} from '../../../store/user/hook'

export default function EditProfile() {
    const allStaff = useUsers()
    const filteredUser = allStaff?.data?.filter(staff => staff.role === 'ADMIN')[0];
    console.log(filteredUser)
    const navigate = useNavigate()
    useFetchUsers()
    useUpdateSearch()
    useUpdateQuery()
    
   
    return (
      <AdminContainer>
        <div className="userTitleContainer">
          <h1 className="userTitle">Information User</h1>
          <div>
            <Link
              to={{
                pathname: "./changePassWord",
              }}
            >
              <button className="userChangePassWord">Change Password</button>
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("USER_LOGIN")
                navigate('/')
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
                
                <span className="userShowUsername">
                    {filteredUser?.nameAccount}
                </span>
                <span className="userShowUserTitle">Admin</span>
                
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account</span>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                {filteredUser?.nameAccount}
                </span>

              </div>
              
              <span className="userShowTitle">Contact</span>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                {filteredUser?.phone}
                </span>

              </div>
              <div className="userShowInfo">
                <span className="userShowInfoTitle">
                {filteredUser?.email}
                </span>

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
                    placeholder={filteredUser?.nameAccount}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone Number</label>
                  <input
                    name="phone"
                    type="phone"
                  //   value={userUpdate.phone}
                    placeholder={filteredUser?.phone}

                    // onChange={(e) => {
                    //   const re = /^[0-9\b]+$/;

                    //   // if value is not blank, then test the regex

                    //   // if (e.target.value === "" || re.test(e.target.value)) {
                    //   //   setUserUpdate((prev) => {
                    //   //     return { ...prev, phone: e.target.value };
                    //   //   });
                    //   // }
                    // }}
                    className="userUpdateInput"
                  />
                </div>

                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    name="email"
                    type="text"
                    placeholder={filteredUser?.email}
                    className="userUpdateInput"
                  />
                </div>
                
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  
                  <img  src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_3.jpg" alt="" className='userUpdateImg'/>

                  <label htmlFor="file"></label>
                  <input
                    accept="image/png, image/gif, image/jpeg"
                  //   ref={inputAvatarRef}
                    type="file"
                    style={{ display: "none" }}
                  />
                </div>
                {/* <button
                  className="userUpdateButton"
                >
                  Update
                </button> */}
              </div>
            </form>
          </div>
        </div>

      </AdminContainer>
    )
}
