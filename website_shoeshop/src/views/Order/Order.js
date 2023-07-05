import React, { useState, useEffect } from 'react'
import Input from '../../components/Input/Input'
import { useDispatch } from 'react-redux';
import { useFetchListInvoice, useListInvoice } from '../../store/invoice/hook'
import { useUpdateQuery, useSearchData, useUpdateSearch } from '../../store/search/hook'
import { updateSearchData } from '../../store/search/index'
import { Link, useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import { useFetchProducts, useProducts, useFetchAllProductType} from '../../store/product/hook'
import OrderBox from "./OrderBox"



export default function Orders() {
    const products = useProducts()
    // products?.data.forEach(product => {
    //   console.log(product._id)
    // })
    // console.log("===== sp: ", products?.data[0].nameProduct);
    useFetchProducts()
    useFetchAllProductType()
    useUpdateQuery()

    const userLogin = JSON.parse(localStorage?.getItem('USER_LOGIN'))
    // console.log("====> User infor: ", userLogin) 
   
    useFetchListInvoice()
    useUpdateSearch()
    useUpdateQuery()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const searchData = useSearchData()
    const listInvoice = useListInvoice()
    const [textSearch, setTextSearch] = useState()
    const [selectedStatus, setSelectedStatus] = useState('all')

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

    
    
    let filteredInvoices = listInvoice?.data;
    if (selectedStatus !== 'all') {
      filteredInvoices = filteredInvoices?.filter(
        (invoice) => invoice.status === selectedStatus && invoice.userId === userLogin?._id
      );
    } else {
      filteredInvoices = filteredInvoices?.filter(
        (invoice) => invoice.userId === userLogin?._id
      );
    }
    // sort time
    const sortedInvoices = filteredInvoices?.sort((a, b) => new Date(b.time) - new Date(a.time));

    /// Handle Pagination func
    const [pageNumber, setPageNumber] = useState(0);
    const productsPerPage = 3;
    const pagesVisited = pageNumber * productsPerPage;
    const paginatedInvoices = sortedInvoices?.slice(pagesVisited, pagesVisited + productsPerPage);
    const pageCount = Math.ceil(sortedInvoices?.length / productsPerPage);
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

    return (
        <div className="max-w-screen-xl mx-auto py-6 mb-10">
            <p className="text-lg font-medium mb-6 uppercase">
                My Orders
            </p>
            <div className="relative p-5 w-full rounded-lg bg-[#F2F2F2] mb-5">
                <Input
                    className="border border-gray-400 rounded-lg text-md text-black pl-9"
                    onChange={handleChangeInput}
                    dark={1}
                    type="text"
                    placeholder="Search by shipping address"
                />
              <span className="absolute ml-3 top-[30px]"><i className="fa-solid fa-magnifying-glass"></i></span>

            </div>

            <div className="flex justify-between mb-6 bg-white border rounded-lg">
              <button
                className={`${
                  selectedStatus === "all"
                    ? "text-[#62B4FF] border-b-2 border-[#62B4FF]"
                    : " text-gray-600"
                } px-4 py-2 hover:text-[#62B4FF]`}
                onClick={() => setSelectedStatus("all")}
              >
                All
              </button>
              <button
                className={`${
                  selectedStatus === "PENDING"
                    ? "text-[#62B4FF] border-b-2 border-[#62B4FF]"
                    : " text-gray-600"
                } px-4 py-2 hover:text-[#62B4FF]`}
                onClick={() => setSelectedStatus("PENDING")}
              >
                PENDING
              </button>
              <button
                className={`${
                  selectedStatus === "PROCESSING"
                    ? "text-[#62B4FF] border-b-2 border-[#62B4FF]"
                    : " text-gray-600"
                } px-4 py-2 hover:text-[#62B4FF]`}
                onClick={() => setSelectedStatus("PROCESSING")}
              >
                PROCESSING
              </button>
              <button
                className={`${
                  selectedStatus === "DELIVERED"
                    ? "text-[#62B4FF] border-b-2 border-[#62B4FF]"
                    : " text-gray-600"
                } px-4 py-2 hover:text-[#62B4FF]`}
                onClick={() => setSelectedStatus("DELIVERED")}
              >
                DELIVERED
              </button>
              <button
                className={`${
                  selectedStatus === "CANCEL"
                    ? "text-[#62B4FF] border-b-2 border-[#62B4FF]"
                    : " text-gray-600"
                } px-4 py-2 hover:text-[#62B4FF]`}
                onClick={() => setSelectedStatus("CANCEL")}
              >
                CANCEL
              </button>
              <button
                className={`${
                  selectedStatus === "RETURN"
                    ? "text-[#62B4FF] border-b-2 border-[#62B4FF]"
                    : " text-gray-600"
                } px-4 py-2 hover:text-[#62B4FF]`}
                onClick={() => setSelectedStatus("RETURN")}
              >
              RETURN / REFUND

              </button>
            </div>
            
            <div className="bg-[#F5F5F5] p-6 rounded-lg">
              <h1 className="mb-2 uppercase">Total Product: {filteredInvoices?.length}</h1>
              {
                paginatedInvoices?.map((invoice, index) => {
                    return (
                        <OrderBox key={index} invoice={invoice} />
                    )
                  })
                  
              }
            </div>
            
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
        </div>
    )
}