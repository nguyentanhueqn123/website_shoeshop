import React, { useState, useEffect } from 'react'
import AdminContainer from '../../../components/AdminContainer/AdminContainer'
import Input from '../../../components/Input/Input'
import Table from './../../../components/Table/Table';
import ActionGroup from './../../../components/ActionGroup/ActionGroup';
import Badge from '../../../components/Badge/Badge'
import couponApi from '../../../api/couponApi';
import { useFetchListCoupon, useListCoupon } from '../../../store/coupon/hook';
import { COUPON_STATUS } from '../../../constants/index'
import classnames from 'classnames';
import { fetchListCoupon } from '../../../store/coupon';
import { useDispatch } from 'react-redux';
import { formatDDMMYYYYHHmm } from '../../../utils/formatDatetime'
import { useUpdateQuery, useSearchData, useUpdateSearch } from '../../../store/search/hook'
import { updateSearchData } from '../../../store/search/index'
import { useNavigate } from 'react-router-dom'
import Dropdown from '../../../components/Dropdown/Dropdown'
import { showToastError, showToastSuccess } from '../../../components/CustomToast/CustomToast';

export default function Coupons() {

    useFetchListCoupon()
    useUpdateSearch()
    useUpdateQuery()
    const searchData = useSearchData()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const listCoupon = useListCoupon()
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

    const updateListCoupon = async () => {
        try {
            dispatch(fetchListCoupon())
        } catch (error){
            console.log(error)
        }
    }

    const handleDeleteCoupon = async (id) => {
        try {
            await couponApi.deleteCoupon(id)
            updateListCoupon()
            showToastSuccess("Xoá mã giảm giá thành công")
        } catch (err) {
            console.log(err)
            showToastError("Xóa mã giảm giá thất bại")
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
            Header: 'START DATE',
            accessor: 'startDate',
            Cell: data => {
                return <span>
                    {formatDDMMYYYYHHmm(data?.row.original.startDate)}
                </span>
            }
        },
        {
            Header: 'END DATE',
            accessor: 'endDate',
            Cell: data => {
                return <span>
                    {formatDDMMYYYYHHmm(data?.row.original.endDate)}
                </span>
            }
        },
        {
            Header: 'NAME',
            accessor: 'name',
        },
        {
            Header: 'CODE',
            accessor: 'code',
        },
        {
            Header: 'PERCENTAGE',
            accessor: 'value'
        },
        {
            Header: 'AMOUNT',
            accessor: 'amount',
        },
        {
            Header: 'STATUS',
            accessor: 'status',
            Cell: data => {
                return <Badge 
                style={{
                    backgroundColor: COUPON_STATUS?.[data.row.original.status.toLowerCase()]?.color
                }}
                className={classnames("text-sm-md px-2 font-medium")}>{COUPON_STATUS?.[data.row.original.status.toLowerCase()]?.label}</Badge>
            }
        },
        {
            Header: 'ACTIONS',
            accessor: 'action',
            Cell: data => {
                return <ActionGroup 
                    showEye={false}
                    onDelete={() => handleDeleteCoupon(data.row.original._id)} 
                    onEdit={() => navigate(`/admin/coupons/edit-coupon/${data.row.original._id}`)}
                />
            }
        },
    ]

    return (
        <AdminContainer>
            <p className="text-lg font-medium mb-6">
                Coupons
            </p>

            <form className="p-5 w-full rounded-lg bg-[#F2F2F2] flex items-center mb-5">
                <Input
                    className="border border-gray-500 rounded-lg text-md text-black h-[42px] mr-5"
                    onChange={handleChangeInput}
                    dark={1}
                    type="text"
                    placeholder="Search by coupon name"
                    classNameContainer="w-full mr-5"
                />
                
               <div className="mr-5 w-2/5">
                    <Dropdown
                        title="Coupon Status"
                        listDropdown={Object.values(COUPON_STATUS)}
                        label="label"
                        onSelect={(status) => {
                            updateFieldSearch('status', status)
                        }}
                    />
               </div>

                <button className="w-1/4 h-[42px] bg-[#62B4FF] rounded-lg px-10 hover:bg-[#349eff] text-white"
                    onClick={() => navigate('/admin/coupons/add-coupon')}
                >
                    <div className="flex items-center justify-center text-md h-full">
                        <i className='bx bx-plus mr-2'></i>
                        <span>Add Coupon</span>
                    </div>
                </button>
            </form>

            {
                listCoupon && (
                    <Table
                        columnsTable={columnsTable}
                        data={listCoupon?.data}
                    />
                )
            }
        </AdminContainer>
    )
}
