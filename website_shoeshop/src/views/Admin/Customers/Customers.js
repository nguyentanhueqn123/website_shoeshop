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
import ReactPaginate from 'react-paginate';

export default function Customers() {
    useFetchAllCustomers()
    useUpdateSearch()
    useUpdateQuery()
    const searchData = useSearchData()
    const customers = useAllCustomers()
    const dispatch = useDispatch()

    const [searchQuery, setSearchQuery] = useState('');
    const handleChangeInput = (e) => {
        setSearchQuery(e.target.value);
    };

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
    /// Handle Pagination func
    const [pageNumber, setPageNumber] = useState(0);
    const productsPerPage = 6;
    const pagesVisited = pageNumber * productsPerPage;

    const pageCount = Math.ceil(customers?.data?.length / productsPerPage);

    const changePage = ({ selected }) => {
    setPageNumber(selected);
    };
    ////

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
                    placeholder="Search by name, email, phone number"
                />
            </div>

           {
               customers && (
                <Table
                    data={customers?.data
                        .filter((customer) =>
                        customer.nameAccount.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .slice(pagesVisited, pagesVisited + productsPerPage)
                        .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))}
                         // pagination rồi mới sort nên lỗi logic tí ^^
                    columnsTable={columnsTable}
                    />
               )
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
