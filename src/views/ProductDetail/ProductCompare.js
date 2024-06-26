/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import Input from '../../components/Input/Input'
import { useDispatch } from 'react-redux'
import { useFetchProducts, useProducts, useFetchAllProductType} from '../../store/product/hook'
import { updateSearchData} from '../../store/search/index'
import { useUpdateQuery, useSearchData, useUpdateSearch } from '../../store/search/hook'
import ProductCardCompare from '../../components/Card/ProductCardCompare'
import { useTranslation } from 'react-i18next'


const ProductCompare = ({ onClose }) => {
  const { t } = useTranslation("product_detail");
  const [textSearch, setTextSearch] = useState()
  const dispatch = useDispatch()
  const products = useProducts()

  useFetchProducts()
  useFetchAllProductType()
  useUpdateQuery()
  useUpdateSearch()

  const updateFieldSearch = (field, value) => {
    dispatch(updateSearchData({ [field]: value }))
  }

  const searchData = useSearchData()
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


  return (
    <div className="bg-gray-800 opacity-95 fixed w-screen h-full top-0 left-0 z-[100001]">
      <div className='flex justify-center items-center h-full opacity-100'>
        <div className='h-[600px] w-[800px] bg-white opacity-100 overflow-y-scroll p-6 rounded-xl'>
          <p className='z-1 cursor-pointer absolute text-white hover:text-black ml-[300px] md:ml-[710px] px-2 bg-[#cccccc]' onClick={onClose}>X</p>
          <div className="container-searchbar">
              <Input
                  className="border border-gray-500 rounded-lg text-md text-black mb-[20px] pl-9 mt-8"
                  onChange={handleChangeInput}
                  dark={1}
                  type="text"
                  placeholder={t('compareProducts.box.search')}
              />
              <span className='icon-search'><i className="fa-solid fa-magnifying-glass"></i></span>
              <div className='h-auto bg-red-300 rounded-xl overflow-hidden border'>
              {
                products?.data?.map((product, index) => {
                  return (
                      <ProductCardCompare product={product} key={index} closeModal={onClose} />
                  )
                })
              }
              </div>
              

            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCompare
