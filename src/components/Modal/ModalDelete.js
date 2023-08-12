import React from 'react'
import Modal from './Modal'
import ModalTitle from './ModalTitle'

export default function ModalDelete({ open, toggle, onConfirm }) {
    return (
        <Modal open={open} onClose={toggle}>
            <ModalTitle onClose={toggle}>
                <i className='text-3xl bx bx-trash text-red-400'></i>
            </ModalTitle>

            <div className="text-center opacity-70 mb-10">
                <p className="text-xl mb-3">
                    Are You Sure! Want to Delete This Record?
                </p>
                <p className="text-sm-md">
                    You can't view this in your list anymore if you delete!
                </p>
            </div>

            <div className="flex items-center justify-center">
                <button className="text-sm-md px-5 mx-3 py-3 rounded-lg border-gray-700 text-black border" onClick={toggle}>
                    No, Keep it
                </button>
                <button className="text-sm-md px-5 mx-3 py-3 bg-[#f87171] rounded-lg text-white" onClick={() => {
                    onConfirm() 
                    toggle()
                }}
                >
                    Yes, Delete it
                </button>
            </div>
        </Modal>
    )
}
