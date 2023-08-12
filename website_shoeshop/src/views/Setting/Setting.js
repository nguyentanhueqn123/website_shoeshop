import React, { useState, useEffect } from 'react'
// import "../Admin/EditProfile/EditProfile.scss"

export default function Setting() {
    const userLogin = JSON.parse(localStorage?.getItem('USER_LOGIN'))
    // console.log("====> User infor: ", userLogin)    
   
    return (
      <div className="px-7 md:px-[11%] mx-auto mb-[120px]">
        <div className="userTitleContainer">
          <h1 className="userTitle text-lg md:text-2xl">Information User</h1>
        </div>

        <div className="flex flex-col md:flex-row mt-3">
            <div className="userShow">
                <div className="userShowTop">
                    <img src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_3.jpg" alt="" className="userShowImg" />

                    <div className="userShowTopTitle">
                        <span className="userShowUsername">
                            {userLogin?.nameAccount}
                        </span>
                        <span className="userShowUserTitle">User</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account</span>
                    <div className="userShowInfo">
                        <span className="userShowInfoTitle">
                            {userLogin?.nameAccount}
                        </span>
                    </div>

                    <span className="userShowTitle">Contact</span>
                    <div className="userShowInfo">
                        <span className="userShowInfoTitle">
                            {userLogin?.phone}
                        </span>
                    </div>

                    <div className="userShowInfo">
                        <span className="userShowInfoTitle">
                            {userLogin?.email}
                        </span>
                    </div>
                
                </div>
            </div>
            <div className="userUpdate mt-5 md:mt-0 ml-0 md:ml-5">
              <span className="userUpdateTitle">Update</span>
              <form className="userUpdateForm1 flex flex-col md:flex-row md:justify-between">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullname"
                      //   value={userUpdate.fullname}
                      placeholder={userLogin?.nameAccount}
                      className="userUpdateInput"
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Phone Number</label>
                    <input
                      name="phone"
                      type="phone"
                    //   value={userUpdate.phone}
                      placeholder={userLogin?.phone}

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
                      placeholder={userLogin?.email}
                      className="userUpdateInput"
                    />
                  </div>
                  
                </div>
                <div className="userUpdateRight">
                  <div className="userUpdateUpload mt-4 md:mt-0">
                    
                    <img  src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_3.jpg" alt="" className='userUpdateImg'/>

                    <label htmlFor="file"></label>
                    <input
                      accept="image/png, image/gif, image/jpeg"
                    //   ref={inputAvatarRef}
                      type="file"
                      style={{ display: "none" }}
                    />
                  </div>
                  <button
                    className="userUpdateButton mt-4 md:mt-0"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          
        </div>

      </div>
    )
}
