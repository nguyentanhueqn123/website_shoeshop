import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination'
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

export default function Product() {
  useFetchProducts()
  useFetchAllProductType()
  useUpdateQuery()
  useUpdateSearch()

  const searchData = useSearchData()

  const products = useProducts()

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

  if (!productTypes || !products) {
    return <LoadingPage />
  }

  return (
    <div className="w-full bg-white px-5">
      <div className="fixed bottom-10 right-10 z-9">
        <OnTop />
      </div>
      <div className="max-w-screen-3xl w-full mx-auto py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xl" id="top">
            <Link to="/" className="opacity-50 hover:opacity-100">TRANG CHỦ</Link>
            <span className="mx-3">/</span>
            <p className="text-black font-medium">CỬA HÀNG</p>
          </div>
        </div>

        <div className="flex mt-5">
          <div className="w-1/5 flex flex-col mr-5">
            <div className="flex items-center justify-between mb-5">
              <h1 className="text-xl text-black opacity-80">Filter & Sort</h1>
              <p className="opacity-80">
                {products?.data?.length} sản phẩm
              </p>
            </div>

            <Dropdown
              title="Sắp xếp"
              listDropdown={Object.values(SORT_PRODUCT_PAGE_PRODUCT)}
              label="label"
              onSelect={(item) => {
                updateFieldSearch('sort', item)
                setReset(false)
              }}
              classNameButton="bg-white border border-gray-500 py-6"
              rounded="none"
              bgDropdown="bg-white border-black"
              reset={reset}
            />

            <button className="border border-black py-3 mt-5 uppercase"
              onClick={e => handleClear(e)}
            >
              Xóa tất cả
            </button>
            <hr className="bg-gray-300 my-5 h-[1px]" />
            {/* <div className="border border-gray-300 rounded p-2 mb-5">
              {
                productTypes?.data?.map((item, index) => {
                  return (
                    <div key={index} className="py-2 border-b border-dashed border-gray-300 opacity-80 hover:opacity-100 text-black">
                      <Link to={`/danh-muc?typeProductId=${item?.typeId}`} className="w-full h-full" >
                        {item?.nameType}
                      </Link>
                    </div>
                  )
                })
              }
            </div> */}

            <div className="">
              <p className="text-lg px-3">Loại sản phẩm</p>
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

            {/* <div className="">
              <p className="text-lg px-3">Giá</p>
              <div className="px-5">
                {
                  productTypes?.data?.map((item, index) => (
                    <CheckBox
                      key={index}
                      id={`price-${item?.nameType}`}
                      label={item?.nameType}
                      className="capitalize"
                      onChange={(checked) => console.log(1)}
                    />
                  ))}
              </div>
            </div> */}
            {/* <hr className="bg-gray-300 my-5 h-[1px]" /> */}
            {productStorage && (
              <>
                <h1 className="text-xl uppercase text-black font-semibold mb-5 opacity-80">Quan tâm</h1>
                <div className="border border-gray-300 rounded p-2 mb-5">
                  {
                    productStorage?.map((product, index) => {
                      return (
                        <div className="py-2 border-b border-dashed border-gray-300 flex">
                          <img src={product?.image?.[0]} alt="product" className="w-16 h-16" />
                          <div className="flex flex-col justify-between">
                            <Link to="/" className="opacity-80 hover:opacity-100 text-black">
                              {product?.name}
                            </Link>
                            <Price
                              className="mb-3"
                              price={product?.priceSale}
                              priceDel={product?.price}
                              color="black"
                            />
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </>
            )}
          </div>
          {/* <Pagination 
          data={products?.data}
          itemsPerPage={12}
            classNameContain="w-4/5 -mx-2 grid grid-cols-4">

          </Pagination> */}

          <div className="w-4/5 -mx-2 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
            {
              products?.data?.map((product, index) => {
                return (
                    <ProductCard product={product} key={index} />
                )
              })
            }

          </div>
        </div>

      </div>
    </div>
  )
}
