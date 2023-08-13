import React, { useState } from 'react'
import Input from '../../../components/Input/Input'
import AdminContainer from '../../../components/AdminContainer/AdminContainer'
import productApi from '../../../api/productApi'
import Button from '../../../components/Button/Button'
import { showToastError, showToastSuccess } from './../../../components/CustomToast/CustomToast';
export default function AddCategory() {

    const [nameType, setNameType] = useState()
    const [note, setNote] = useState()
    const [pending, setPending] = useState(false)

    const resetInput = () => {
        setNameType('')
        setNote('')
    }

    const handleAddCategory = async (e) => {
        e.preventDefault()
        setPending(true)
        try {
            await productApi.postProductType({
                nameType: nameType,
                note: note,
            })
            setPending(false)
            resetInput()
            showToastSuccess("Add successful product categories")
        } catch (error) {
            console.log(error)
            setPending(false)
            showToastError("Add failed product categories")
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
                        <label htmlFor="category-note">Note:</label>
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
                    onClick={(e) => handleAddCategory(e)}
                    pending={pending}
                    isLoading={pending}
                >
                    Add Category
                </Button>
            </form>
        </AdminContainer>
    )
}
