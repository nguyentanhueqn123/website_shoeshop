import React, { useState } from 'react'
import userApi from '../../api/userApi';
import { showToastError, showToastSuccess } from '../../components/CustomToast/CustomToast';
import { useTranslation } from 'react-i18next';

function updateUserInformation(userId, userInfo, setUserLogin) {
  userApi.editUser(userId, userInfo)
      .then(response => {
          console.log('Update successful', response);
          const updatedUserInfo = {...JSON.parse(localStorage.getItem('USER_LOGIN')), ...userInfo};
          localStorage.setItem('USER_LOGIN', JSON.stringify(updatedUserInfo));
          setUserLogin(updatedUserInfo); // Cập nhật state để render lại UI
          showToastSuccess("Update successful")
      })
      .catch(error => {
          console.error('Failed to update user information', error);
          showToastError("Update failed")
      });
}

export default function Setting() {
  const { t } = useTranslation("settingUser");
    const [userLogin, setUserLogin] = useState(JSON.parse(localStorage?.getItem('USER_LOGIN')));
    // console.table(userLogin);  

    const [userInfo, setUserInfo] = useState({
      nameAccount: `${userLogin?.nameAccount}`,
      email: `${userLogin?.email}`,
      phone: `${userLogin?.phone}`,
      image: `${userLogin?.image}`
      // Add other user fields here
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = `changeInfor/${userLogin._id}`;
        updateUserInformation(userId, userInfo, setUserLogin); // Thêm setUserLogin vào hàm để cập nhật state
    };
   
    return (
      <div className="px-4 md:px-[11%] mx-auto mb-[120px]">
        <div className="userTitleContainer">
          <h1 className="userTitle text-lg md:text-2xl mt-4">{t('title')}</h1>
        </div>

        <div className="flex flex-col md:flex-row mt-3">
            <div className="userShow">
                <div className="userShowTop">
                    <img src={userLogin?.image || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"} alt="" className="userShowImg"/>
                    <div className="userShowTopTitle">
                        <span className="userShowUsername">
                            {userLogin?.nameAccount}
                        </span>
                        <span className="userShowUserTitle">User</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">{t('account')}</span>
                    <div className="userShowInfo">
                        <span className="userShowInfoTitle">
                            {userLogin?.nameAccount}
                        </span>
                    </div>

                    <span className="userShowTitle">{t('contact')}</span>
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
              <span className="userUpdateTitle">{t('update')}</span>
              <form onSubmit={handleSubmit} className="userUpdateForm1 flex flex-col md:flex-row md:justify-between">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>{t('name')}</label>
                    <input
                        type="text"
                        name="nameAccount"
                        value={userInfo.nameAccount}
                        onChange={handleChange}
                        placeholder={t('name')}
                        className='px-3 py-1 border rounded-md'
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>{t('email')}</label>
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        placeholder={t('email')}
                        className='px-3 py-1 border rounded-md'

                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>{t('phone')}</label>
                    <input
                        type="phone"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleChange}
                        placeholder={t('phone')}
                        className='px-3 py-1 border rounded-md'

                    />
                  </div>
                </div>

                <div className="userUpdateRight">
                  <div className="userUpdateUpload mt-4 md:mt-0 flex flex-col">
                    <img src={userLogin?.image || "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"} alt="" className='userUpdateImg'/>
                    <input
                      type="text"
                      name="image"
                      value={userInfo.image}
                      onChange={handleChange}
                      placeholder={t('linkImage')}
                      className="my-4 px-3 py-1 border rounded-md"
                    />
                    {/* <label htmlFor="file"></label><label htmlFor="file"><i className="userUpdateIcon"></i></label>
                    <input type="file" id="file" style={{display: "none"}}/> */}
                  </div>
                  <button className="userUpdateButton">{t('update')}</button>
                </div>
              </form>
            </div>
        </div>
      </div>
    );
}