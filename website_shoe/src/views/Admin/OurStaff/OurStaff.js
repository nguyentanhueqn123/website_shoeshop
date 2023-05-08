import React, { useState, useEffect } from 'react'
import AdminContainer from '../../../components/AdminContainer/AdminContainer'
import Input from '../../../components/Input/Input'
import Dropdown from '../../../components/Dropdown/Dropdown'
import userApi from './../../../api/userApi';
import StaffCard from './../../../components/Card/StaffCard';
import { useDispatch } from 'react-redux';
import { useUpdateQuery, useSearchData, useUpdateSearch } from '../../../store/search/hook'
import { updateSearchData } from '../../../store/search/index'
import { STAFF_ROLE } from '../../../constants/index'
import { useFetchUsers, useUsers } from '../../../store/user/hook'
export default function OurStaff() {
    useFetchUsers({ role: 'Admin,Seller,CEO,Manager,Account,Delivery' })
    useUpdateSearch()
    useUpdateQuery()
    const searchData = useSearchData()
    const allStaff = useUsers()
    console.log(allStaff)
    const dispatch = useDispatch()
    const [textSearch, setTextSearch] = useState()

    const handleChangeInput = (e) => {
        setTextSearch(e.target.value)
    }

    const updateFieldSearch = (field, value) => {
        dispatch(updateSearchData({ [field]: value }))
    }

    useEffect(() => {
        if (textSearch !== undefined) {
            updateFieldSearch('textSearch', textSearch)
        }
    }, [textSearch])

    useEffect(() => {
        setTextSearch(searchData?.textSearch)
    }, [])

    const handleDeleteStaff = async (id) => {
        try {
            await userApi.deleteUser(id)
        } catch (err) { 
            console.log(err)
        }
    }

    const listRole = [
        'Admin',
        'CEO',
        'Manager',
        'Accountant',
        'Delivery Person',
    ]

    return (
        <AdminContainer>
            <p className="text-lg font-medium mb-6">
                All Staff
            </p>

            <div className="p-5 w-full rounded-lg bg-[#F2F2F2] flex items-center mb-5">
                <div className="grid grid-cols-2 w-4/5 mr-5 gap-x-5">
                    <Input
                        className="border border-gray-400 rounded-lg text-md text-black"
                        onChange={handleChangeInput}
                        dark={1}
                        type="text"
                        placeholder="Search by staff name"
                    />

                    <Dropdown
                        title="Staff Role"
                        listDropdown={Object.values(STAFF_ROLE)}
                        label="label"
                        onSelect={(role) => {
                            updateFieldSearch('role', role)
                        }}
                    />
                </div>

                <button className="bg-[#62B4FF] rounded-lg px-10 hover:bg-[#349eff] w-1/5 h-[42px] text-white">
                    <div className="flex items-center justify-center text-md">
                        <i className='bx bx-plus mr-2'></i>
                        <span className="whitespace-nowrap">Add Staff</span>
                    </div>
                </button>
            </div>

           <div className="grid grid-cols-4 gap-x-4">
               {
                    allStaff?.data?.map((staff, index) => {
                        return <StaffCard user={staff} key={index} />
                    })
               }
           </div>
        </AdminContainer>
    )
}
