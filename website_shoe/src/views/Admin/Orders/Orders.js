import React, { useState, useEffect } from 'react'
import AdminContainer from '../../../components/AdminContainer/AdminContainer'
import Input from '../../../components/Input/Input'
import Dropdown from '../../../components/Dropdown/Dropdown'
import Table from '../../../components/Table/Table'
import { Eye } from 'react-feather'
import { PRODUCT_STATUS } from '../../../constants/index'
import { useDispatch } from 'react-redux';
import { useFetchListInvoice, useListInvoice } from '../../../store/invoice/hook'
import { fetchListInvoice } from '../../../store/invoice'
import invoiceApi from '../../../api/invoiceApi'
import { formatDDMMYYYYHHmm } from '../../../utils/formatDatetime'
import { useUpdateQuery, useSearchData, useUpdateSearch } from '../../../store/search/hook'
import { updateSearchData } from '../../../store/search/index'
import { useNavigate } from 'react-router-dom'
import ActionGroup from '../../../components/ActionGroup/ActionGroup';
import { SORT_PRODUCT_COST } from '../../../constants/index'
import { formatPrice } from '../../../utils/formatPrice'
import { showToastError, showToastSuccess } from './../../../components/CustomToast/CustomToast';
import ReactPaginate from 'react-paginate';


export default function Orders() {

    useFetchListInvoice()
    useUpdateSearch()
    useUpdateQuery()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const searchData = useSearchData()
    const listInvoice = useListInvoice()
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

    const updateInvoice = () => {
        try {
            dispatch(fetchListInvoice())
        } catch (err) {
            console.log(err)
        }
    }

    const handleChangeStatus = async (id, status) => {
        try {
            await invoiceApi.editInvoice(id, {
                status: status.toUpperCase()
            })
            updateInvoice()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteInvoice = async (id,status) => {
        try {
            await invoiceApi.deleteInvoice(id)
            updateInvoice()
            showToastSuccess("Xóa hóa đơn thành công")
        } catch (error) {
            console.log(error)
            showToastError("Xóa hóa đơn thất bại")
        }
    }

    const listDropdownLimits = [
        'Low to High',
        'High to Low',
    ]

    const columnsTable = [
        {
            Header: 'No',
            accessor: '_id',
            Cell: data => {
                return <span>
                    {data?.row?.original?._id?.slice(0, 4)}...{data?.row?.original?._id?.slice(data?.row?.original?._id?.length - 4, data?.row?.original?._id?.length)}
                </span>
            }
        },
        {
            Header: 'TIME',
            accessor: 'time',
            Cell: data => {
                return <span>
                    {formatDDMMYYYYHHmm(data?.row.original.time)}
                </span>
            }
        },
        {
            Header: 'SHIPPING ADDRESS',
            accessor: 'address',
        },
        {
            Header: 'PHONE',
            accessor: 'phone',
        },
        {
            Header: 'METHOD',
            accessor: 'paymentMethod',
        },
        {
            Header: 'Cost',
            accessor: 'cost',
            Cell: data => {
                return <span>
                    {formatPrice(data?.row?.original?.cost)} VND
                </span>
            }
        },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: data => {
                return <Dropdown title={data?.row.original.status}
                    className="w-32"
                    listDropdown={Object.values(PRODUCT_STATUS)}
                    value="value"
                    label="label"
                    onSelect={(status) => handleChangeStatus(data?.row.original._id, status)}
                    classNameButton={data?.row.original.status.toLowerCase() === "cancel" ? "bg-red-500"
                        : data?.row.original.status.toLowerCase() === "pending" ? "bg-blue-1"
                            : data?.row.original.status.toLowerCase() === "processing" ? "bg-orange-1"
                                : "bg-green-1"
                    }
                />
            }
        },
        {
            Header: 'Action',
            Cell: data => {
                return <ActionGroup
                    showEye={false}
                    showEdit={false}
                    onDelete={() => handleDeleteInvoice(data.row.original._id)}
                />
            }
        },
    ]
     /// Handle Pagination func
     const [pageNumber, setPageNumber] = useState(0);
     const productsPerPage = 6;
     const pagesVisited = pageNumber * productsPerPage;
 
     const pageCount = Math.ceil(listInvoice?.data?.length / productsPerPage);
 
     const changePage = ({ selected }) => {
     setPageNumber(selected);
     };
     ////

    return (
        <AdminContainer>
            <p className="text-lg font-medium mb-6">
                Orders
            </p>

            <div className="p-5 w-full rounded-lg bg-[#F2F2F2] grid grid-cols-3 gap-x-5 mb-5">
                <Input
                    className="border border-gray-400 rounded-lg text-md text-black"
                    onChange={handleChangeInput}
                    dark={1}
                    type="text"
                    placeholder="Search by shipping address"
                />

                <Dropdown
                    title="Status"
                    listDropdown={Object.values(PRODUCT_STATUS)}
                    label="label"
                    onSelect={(status) => {
                        updateFieldSearch('status', status)
                    }}
                />
                <Dropdown
                    title="Cost"
                    listDropdown={Object.values(SORT_PRODUCT_COST)}
                    label="label"
                    onSelect={(item) => {
                        updateFieldSearch('sort', item)
                    }}
                />

            </div>


            {
                listInvoice && <Table
                    columnsTable={columnsTable}
                    data={listInvoice?.data.slice(pagesVisited, pagesVisited + productsPerPage)}
                />
            }
            <ReactPaginate
              previousLabel={"Previous"}
              previousClassName="mr-2 border px-3 py-1 rounded-lg hover:bg-[#349eff] hover:text-white"
              nextLabel={"Next"}
              nextClassName="ml-2 border px-3 py-1 rounded-lg hover:bg-[#349eff] hover:text-white"
              pageCount={pageCount}
              pageClassName="px-3 py-1"
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive border px-3 py-1 rounded-lg bg-[#62B4FF] text-white"}
              className="flex justify-end w-full  my-3"
            />
        </AdminContainer>
    )
}
