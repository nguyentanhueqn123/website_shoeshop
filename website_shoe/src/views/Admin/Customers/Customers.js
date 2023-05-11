import React, { useState, useEffect } from 'react'
import AdminContainer from '../../../components/AdminContainer/AdminContainer'
import Input from '../../../components/Input/Input'
import Table from '../../../components/Table/Table'
import ActionGroup from '../../../components/ActionGroup/ActionGroup';
import userApi from '../../../api/userApi';
import { useFetchAllCustomers, useAllCustomers } from '../../../store/user/hook' 
import { fetchAllCustomers } from '../../../store/user';
import { useDispatch } from 'react-redux';
import { formatDDMMYYYYHHmm } from '../../../utils/formatDatetime'
import { useUpdateQuery, useSearchData, useUpdateSearch } from '../../../store/search/hook'
import { updateSearchData } from '../../../store/search/index'
export default function Customers() {
    useFetchAllCustomers()
    useUpdateSearch()
    useUpdateQuery()
    const searchData = useSearchData()
    const customers = useAllCustomers()
    const dispatch = useDispatch()
    const [textSearch, setTextSearch] = useState()

    const handleChangeInput = (e) => {
        setTextSearch(e.target.value)
    }

    const updateFieldSearch = (field, value) => {
        dispatch(updateSearchData({ [field]: value }))
    }


    const updateCustomers = async () => {
        try {
            await dispatch(fetchAllCustomers())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (textSearch !== undefined) {
            updateFieldSearch('textSearch', textSearch)
        }
    }, [textSearch])

    useEffect(() => {
        setTextSearch(searchData?.textSearch)
    }, [])

    const handleDeleteCustomer = async (id) => {
        try {
            await userApi.deleteUser(id)
            updateCustomers()
        } catch (err) {
            console.log(err)
        }
    }

    const columnsTable = [
        {
            Header: 'ID',
            accessor: '_id',
            Cell: data => {
                return <span>
                    {data?.row?.original?._id?.slice(0, 4)}...{data?.row?.original?._id?.slice(data?.row?.original?._id?.length - 4, data?.row?.original?._id?.length)}
                </span>
            }
        },
        {
            Header: 'JOINING DATE',
            accessor: 'createAt',
            Cell: data => {
                return <span>
                    {formatDDMMYYYYHHmm(data?.row.original.createAt)}
                </span>
            }
        },
        {
            Header: 'NAME',
            accessor: 'nameAccount',
        },
        {
            Header: 'EMAIL',
            accessor: 'email',
        },
        {
            Header: 'PHONE',
            accessor: 'phone',
        },
        {
            Header: 'ACTIONS',
            accessor: 'actions',
            Cell: data => {
                return <ActionGroup showEdit={false} showEye={false} onDelete={() => handleDeleteCustomer(data.row.original._id)} />
            }
        },
    ]

    return (
        <AdminContainer>
            <p className="text-lg font-medium mb-6">
                Customers
            </p>

            <div className="p-5 w-full rounded-lg bg-[#F2F2F2] mb-5">
                <Input
                    className="border border-gray-400 rounded-lg text-md text-black"
                    onChange={handleChangeInput}
                    dark={1}
                    type="text"
                    placeholder="Search by name"
                />
            </div>

           {
               customers && (
                    <Table
                        data={customers?.data}
                        columnsTable={columnsTable}
                    />
               )
           }
        </AdminContainer>
    )
}
