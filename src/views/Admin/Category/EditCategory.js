import React, { useState, useEffect } from 'react'
import Input from '../../../components/Input/Input'
import AdminContainer from '../../../components/AdminContainer/AdminContainer'
import { useFetchProductType, useProductType } from './../../../store/product/hook';
import productApi from '../../../api/productApi'
import Button from '../../../components/Button/Button'
import { useParams } from 'react-router-dom';
import { showToastError, showToastSuccess } from './../../../components/CustomToast/CustomToast';
import { useNavigate } from 'react-router-dom';
export default function EditCategory() {
  const navigate = useNavigate()
  useFetchProductType()
  const productType = useProductType()
  const { id } = useParams()
  const [nameType, setNameType] = useState()
  const [note, setNote] = useState()
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (productType) {
      setNameType(productType?.data?.[0]?.nameType)
      setNote(productType?.data?.[0]?.note)
    }
  }, [productType])


  const handleEditCategory = async (e) => {
    e.preventDefault()
    setPending(true)
    try {
      await productApi.editProductType(id, {
        nameType: nameType,
        note: note,
      })
      setPending(false)
      showToastSuccess("Update successful")
      navigate("/admin/category")

    } catch (error) {
      console.log(error)
      showToastError("Update failed")
    }
  }

  return (
    <AdminContainer>
      <form>
        <Input
          className="border border-gray-500 rounded-lg text-md"
          label="Name"
          name="category-name"
          dark={1}
          type="text"
          value={nameType}
          placeholder="Category name"
          onChange={(e) => setNameType(e.target.value)}
        />

        <div className="mt-5">
          <div className="mb-3">
            <label for="category-note">Note:</label>
          </div>

          <textarea
            onChange={(e) => setNote(e.target.value)}
            placeholder='Note'
            id="category-note"
            name="category-note"
            value={note}
            className="p-3 w-full h-40 border-gray-500 rounded-lg text-md border"
          />
        </div>

        <Button
          className={"text-white w-full md:w-auto text-center flex justify-center"}
          onClick={(e) => handleEditCategory(e)}
          pending={pending}
          isLoading={pending}
        >
          Edit Category
        </Button>
      </form>
    </AdminContainer>
  )
}
