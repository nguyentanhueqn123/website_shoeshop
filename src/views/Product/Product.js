/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/Card/ProductCard';
import Input from '../../components/Input/Input';
import LoadingProduct from '../../components/LoadingPage/LoadingProduct';
import OnTop from '../../components/OnTop/OnTop';
import { SORT_PRODUCT_PAGE_PRODUCT } from '../../constants';
import { useAllProductType, useFetchAllProductType, useFetchProducts, useProducts } from '../../store/product/hook';
import { useSearchData, useUpdateQuery, useUpdateSearch } from '../../store/search/hook';
import { resetSearchData, updateSearchData } from '../../store/search/index';
import CheckBox from './../../components/Checkbox/Checkbox';
import Dropdown from './../../components/Dropdown/Dropdown';
import "./Product.scss";



export default function Product() {
  const { t } = useTranslation(["product", "general"]);

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
    return <LoadingProduct />
  }


  return (
    <div className="w-full bg-white px-4 md:px-7">
      <div className="fixed bottom-10 right-10 z-9">
        <OnTop />
      </div>
      <div className="max-w-screen-3xl w-full mx-auto md:py-5">
        <div className="hidden md:block items-center justify-between">
          <div className="flex items-center text-xl" id="top">
            <Link to="/" className="opacity-50 hover:opacity-100 uppercase">{t('path.home')}</Link>
            <span className="mx-3">/</span>
            <p className="text-black font-medium uppercase">{t('path.products')}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-5">
          <div className="w-full h-auto inline md:block md:w-1/5 flex-col md:mr-[40px]">
            <div className="flex items-center justify-between mb-3 md:mb-5">
              <h1 className="text-xl text-black opacity-80">{t('filter.title')}</h1>
              <p className="opacity-80">
                {products?.data?.length} {t('filter.product')}
              </p>
            </div>
             {/* Search Products */}
            <div className="container-searchbar">
              <Input
                  className="border border-gray-500 rounded-lg text-md text-black mb-[20px] pl-9"
                  onChange={handleChangeInput}
                  dark={1}
                  type="text"
                  placeholder={t('filter.inputSearch')}
              />
              <span className='icon-search'><i className="fa-solid fa-magnifying-glass"></i></span>

            </div>

            <div className="container-sort">
              <Dropdown
                title={t('filter.dropSort')}
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
              <p className="text-lg">{t('filter.category')}</p>
              <div className="md:px-5 flex justify-between md:block">
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
            <button className="w-full text-white py-2.5 mb-5 md:mt-2 uppercase rounded-lg bg-[#62B4FF] hover:bg-[#349eff]"
              onClick={e => handleClear(e)}
            >
              {t('filter.btnClear')}
            </button>
          
          </div>

          <div className="w-full md:w-4/5 md:-mx-2 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
            {
              products?.data?.slice(pagesVisited, pagesVisited + productsPerPage).map((product, index) => {
                return (
                    <ProductCard product={product} key={index} />
                )
              })
            }
            <div className="">
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
              className="flex justify-start w-full my-3"
            />
            </div>

          </div>

          
          
        
      
        </div>

      </div>
    </div>
  )
}