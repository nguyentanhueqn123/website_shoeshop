import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import ProductCard from '../../components/Card/ProductCard'
import { useFetchProducts, useProducts, useFetchAllProductType, useAllProductType } from '../../store/product/hook'
import { ADD_ITEM_TO_JUST_VIEW } from '../../utils/storage'
import Price from '../../components/Price/Price'
import LoadingPage from './../../components/LoadingPage/Loading';
import Dropdown from './../../components/Dropdown/Dropdown';
import { SORT_PRODUCT_PAGE_PRODUCT } from '../../constants';
import CheckBox from './../../components/Checkbox/Checkbox';
import { updateSearchData, resetSearchData } from '../../store/search/index'
import { useUpdateQuery, useSearchData, useUpdateSearch } from '../../store/search/hook'
import { useDispatch } from 'react-redux'
import OnTop from '../../components/OnTop/OnTop'
import Input from '../../components/Input/Input';
import "./Product.scss"


export default function Product() {
  useFetchProducts()
  useFetchAllProductType()
  useUpdateQuery()
  useUpdateSearch()

  const searchData = useSearchData()
  
  /// Search Products
  const [textSearch, setTextSearch] = useState()
  const handleChangeInput = (e) => {
    setTextSearch(e.target.value)
  }
  useEffect(() => {
    if (textSearch !== undefined) {
        updateFieldSearch('textSearch', textSearch)
    }
  }, [textSearch])

  useEffect(() => {
      setTextSearch(searchData?.textSearch)
  }, [])
  ////

  const products = useProducts()
  // console.log("===== sp: ", products?.data);

  const productTypes = useAllProductType()
  const [reset, setReset] = useState(false)
  const dispatch = useDispatch()
  let productStorage = ADD_ITEM_TO_JUST_VIEW.get()

  const updateFieldSearch = (field, value) => {
    dispatch(updateSearchData({ [field]: value }))
  }

  const handleClear = (e) => {
    e.preventDefault();
    dispatch(resetSearchData())
    setReset(true)
  }
  const handleChangeCheckbox = (key, value, checked) => {
    const _currentValue = searchData?.[key] ? [...searchData?.[key]] : []
    if (checked) {
      // push value to array
      _currentValue.push(value)
    } else {
      // remove value to array
      const index = _currentValue.indexOf(value)
      if (index !== -1) {
        _currentValue.splice(index, 1)
      }
    }
    dispatch(updateSearchData({ [key]: _currentValue }))
  }

  /// Handle Pagination func
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const pagesVisited = pageNumber * productsPerPage;

  const pageCount = Math.ceil(products?.data?.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  ////

  if (!productTypes || !products) {
    return <LoadingPage />
  }

  return (
    <div className="w-full bg-white px-7">
      <div className="fixed bottom-10 right-10 z-9">
        <OnTop />
      </div>
      <div className="max-w-screen-3xl w-full mx-auto py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xl" id="top">
            <Link to="/" className="opacity-50 hover:opacity-100">HOME</Link>
            <span className="mx-3">/</span>
            <p className="text-black font-medium">PRODUCTS</p>
          </div>
        </div>

        <div className="flex mt-5">
          <div className="w-1/5 flex flex-col mr-[40px]">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-xl text-black opacity-80">Filter & Sort</h1>
              <p className="opacity-80">
                {products?.data?.length} Products
              </p>
            </div>
             {/* Search Products */}
            <div className="container-searchbar">
              <Input
                  className="border border-gray-500 rounded-lg text-md text-black mb-[20px] pl-9"
                  onChange={handleChangeInput}
                  dark={1}
                  type="text"
                  placeholder="Search by Product Name"
              />
              <span className='icon-search'><i className="fa-solid fa-magnifying-glass"></i></span>

            </div>

            <div className="container-sort">
              <Dropdown
                title="Sort"
                listDropdown={Object.values(SORT_PRODUCT_PAGE_PRODUCT)}
                label="label"
                onSelect={(item) => {
                  updateFieldSearch('sort', item)
                  setReset(false)
                }}
                classNameButton="bg-white border border-gray-500 py-5 rounded-lg pl-9"
                rounded="none"
                bgDropdown="bg-white rounded-lg mt-2 shadow-md p-2"
                reset={reset}
              />
              <span className='icon-filter'><i className="fa-solid fa-filter"></i></span>
            </div>

            
            <hr className="bg-gray-300 my-5 h-[1px]" />



            <div className="">
              <p className="text-lg">Category</p>
              <div className="px-5">
                {
                  productTypes?.data?.map((item, index) => (
                    <CheckBox
                      key={index}
                      id={`product-type-${item?.nameType}`}
                      checked={searchData?.typeIdArray !== undefined && searchData?.typeIdArray?.includes(item?._id)}
                      label={item?.nameType}
                      className="capitalize"
                      onChange={(checked) => handleChangeCheckbox('typeIdArray', item?._id, checked)}
                    />
                  ))}
              </div>
            </div>
            
            <hr className="bg-gray-300 my-5 h-[1px]" />
            <button className="text-white py-2.5 mt-2 uppercase rounded-lg bg-[#62B4FF] hover:bg-[#349eff]"
              onClick={e => handleClear(e)}
            >
              Clear Filter
            </button>
          
          </div>

          <div className="w-4/5 -mx-2 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
            {
              products?.data?.slice(pagesVisited, pagesVisited + productsPerPage).map((product, index) => {
                return (
                    <ProductCard product={product} key={index} />
                )
              })
            }
            <div className="">
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
              className="flex justify-start w-full my-3"
            />
            </div>

          </div>

          
          
        
      
        </div>

      </div>
    </div>
  )
}