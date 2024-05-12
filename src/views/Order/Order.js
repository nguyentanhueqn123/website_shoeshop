import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import Input from '../../components/Input/Input';
import { useFetchListInvoice, useListInvoice } from '../../store/invoice/hook';
import { useFetchAllProductType, useFetchProducts } from '../../store/product/hook';
import { useSearchData, useUpdateQuery, useUpdateSearch } from '../../store/search/hook';
import { updateSearchData } from '../../store/search/index';
import OrderBox from "./OrderBox";



export default function Orders() {
    const { t } = useTranslation(["order", "general"]);

    // const products = useProducts()
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
    // const navigate = useNavigate()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textSearch])

    useEffect(() => {
        setTextSearch(searchData?.textSearch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <p className="text-md md:text-lg font-medium mx-4 md:mx-0 mb-3 md:mb-6 uppercase">
              {t('title')}
            </p>
            <div className="relative mx-4 md:mx-0 md:p-5 rounded-lg bg-[#F2F2F2] mb-5">
                <Input
                    className="border border-gray-400 rounded-lg text-md text-black pl-9"
                    onChange={handleChangeInput}
                    dark={1}
                    type="text"
                    placeholder={t('search')}
                />
              <span className="absolute ml-3 top-[10px] md:top-[30px]"><i className="fa-solid fa-magnifying-glass"></i></span>

            </div>

            <div className="flex justify-between mb-6 bg-white border md:rounded-lg overflow-x-scroll md:overflow-hidden">
              <button
                className={`${
                  selectedStatus === "all"
                    ? "text-[#62B4FF] border-b-2 border-[#62B4FF]"
                    : " text-gray-600"
                } px-4 py-2 hover:text-[#62B4FF]`}
                onClick={() => setSelectedStatus("all")}
              >
                {t('status.all')}
              </button>
              <button
                className={`${
                  selectedStatus === "PENDING"
                    ? "text-[#62B4FF] border-b-2 border-[#62B4FF]"
                    : " text-gray-600"
                } px-4 py-2 hover:text-[#62B4FF]`}
                onClick={() => setSelectedStatus("PENDING")}
              >
                {t('status.pending')}
              </button>
              <button
                className={`${
                  selectedStatus === "PROCESSING"
                    ? "text-[#62B4FF] border-b-2 border-[#62B4FF]"
                    : " text-gray-600"
                } px-4 py-2 hover:text-[#62B4FF]`}
                onClick={() => setSelectedStatus("PROCESSING")}
              >
                {t('status.processing')}
              </button>
              <button
                className={`${
                  selectedStatus === "DELIVERED"
                    ? "text-[#62B4FF] border-b-2 border-[#62B4FF]"
                    : " text-gray-600"
                } px-4 py-2 hover:text-[#62B4FF]`}
                onClick={() => setSelectedStatus("DELIVERED")}
              >
                {t('status.delivered')}
              </button>
              <button
                className={`${
                  selectedStatus === "CANCEL"
                    ? "text-[#62B4FF] border-b-2 border-[#62B4FF]"
                    : " text-gray-600"
                } px-4 py-2 hover:text-[#62B4FF]`}
                onClick={() => setSelectedStatus("CANCEL")}
              >
                {t('status.cancel')}
              </button>
              <button
                className={`${
                  selectedStatus === "RETURN"
                    ? "text-[#62B4FF] border-b-2 border-[#62B4FF]"
                    : " text-gray-600"
                } px-4 py-2 hover:text-[#62B4FF]`}
                onClick={() => setSelectedStatus("RETURN")}
              >
                {t('status.return')}
              </button>
            </div>
            
            <div className="bg-[#F5F5F5] p-4 md:p-6 md:rounded-lg">
              <h1 className="mb-2 uppercase">{t('totalProduct')}: {filteredInvoices?.length}</h1>
              {
                paginatedInvoices?.map((invoice, index) => {
                    return (
                        <OrderBox key={index} invoice={invoice} />
                    )
                  })
                  
              }
            </div>
            
            <ReactPaginate
              previousLabel={t('general:pre')}
              previousClassName="mr-2 border px-3 py-1 rounded-lg hover:bg-[#349eff] hover:text-white"
              nextLabel={t('general:next')}
              nextClassName="ml-2 border px-3 py-1 rounded-lg hover:bg-[#349eff] hover:text-white"
              pageCount={pageCount}
              pageClassName="px-3 py-1"
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive border px-3 py-1 rounded-lg bg-[#62B4FF] text-white"}
              className="flex justify-end w-full my-3 pr-4 md:pr-0"
            />
        </div>
    )
}