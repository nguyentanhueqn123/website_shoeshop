import React, { useState } from 'react'
import Input from '../../../components/Input/Input'
import AdminContainer from '../../../components/AdminContainer/AdminContainer'
import Dropdown from '../../../components/Dropdown/Dropdown'
import { useFetchAllProductType, useAllProductType } from './../../../store/product/hook';
import productApi from '../../../api/productApi'
import Button from '../../../components/Button/Button'
import { showToastError, showToastSuccess } from './../../../components/CustomToast/CustomToast';
export default function AdminAddProduct() {
  useFetchAllProductType()
  const productTypes = useAllProductType()

  const [nameProduct, setNameProduct] = useState()
  const [price, setPrice] = useState()
  const [sale, setSale] = useState()
  const [description, setDescription] = useState()
  const [image, setImage] = useState()
  const [metal, setMetal] = useState()
  const [size, setSize] = useState()
  const [typeProductId, setTypeProductId] = useState()
  const [pending, setPending] = useState(false)

  const resetInput = () => {
    setNameProduct('')
    setPrice('')
    setSale('')
    setDescription('')
    setMetal('')
    setSize('')
    setImage('')
    setTypeProductId('')
  }


  const handleAddProduct = async (e) => {
    e.preventDefault()
    setPending(true)
    try {
      await productApi.postProduct({
        nameProduct,
        image,
        typeId: typeProductId,
        description,
        price,
        sale,
        metal,
        size,
      })
      setPending(false)
      resetInput()
      showToastSuccess("Add successful product")
    } catch (error) {
      console.log(error)
      showToastError("Add failed product")
    }
  }

  return (
    <AdminContainer>
      <form>
        <div className="mb-5">
          <div className="mb-3">
            <label for="product-image">Product Image:</label>
          </div>

          <textarea
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image Link"
            id="product-image"
            name="product-image"
            className="p-3 w-full h-20 border-gray-400 rounded-lg text-md text-black border"
          />
        </div>

        <Input
          className="border border-gray-400 rounded-lg text-md text-black"
          label="Product Name"
          name="product-name"
          dark={1}
          type="text"
          value={nameProduct}
          placeholder="Product name"
          onChange={(e) => setNameProduct(e.target.value)}
        />
        <div className="mt-5">
          <div className="mb-3">
            <label for="product-des">Product Description:</label>
          </div>

          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Product Description'
            id="product-des"
            name="product-des"
            value={description}
            className="p-3 w-full h-40 border-gray-400 rounded-lg text-md text-black border"
          />
        </div>

        <p className="mb-3 mt-5">
          Product Type
        </p>
        <Dropdown
          title="Product Type"
          listDropdown={productTypes?.data}
          label="nameType"
          value="typeId"
          onSelect={setTypeProductId}
        />

        <Input
          className="border border-gray-400 rounded-lg text-md text-black"
          label="Product Metal"
          name="product-metal"
          dark={1}
          type="text"
          placeholder="Product Metal"
          classNameContainer="mt-5"
          onChange={(e) => setMetal(e.target.value)}
          value={metal}
        />

        <Input
          className="border border-gray-400 rounded-lg text-md text-black"
          label="Product Size"
          name="product-size"
          dark={1}
          type="text"
          placeholder="Product Size"
          classNameContainer="mt-5"
          onChange={(e) => setSize(e.target.value)}
          value={size}
        />

        <Input
          className="border border-gray-400 rounded-lg text-md text-black"
          label="Product Price"
          name="product-price"
          dark={1}
          type="number"
          placeholder="Price"
          classNameContainer="mt-5"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />

        <Input
          className="border border-gray-400 rounded-lg text-md text-black"
          label="Sale"
          name="product-sale"
          dark={1}
          type="number"
          placeholder="Sale"
          classNameContainer="mt-5"
          onChange={(e) => setSale(e.target.value)}
          value={sale}
        />
        <Button
          className={"text-white w-full md:w-auto text-center flex justify-center"}
          onClick={(e) => handleAddProduct(e)}
          pending={pending}
          isLoading={pending}
        >
          Add Product
        </Button>
      </form>
    </AdminContainer>
  )
}
