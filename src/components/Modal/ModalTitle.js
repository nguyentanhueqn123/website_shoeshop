import { Dialog } from '@headlessui/react'
export default function ModalTitle({ children }) {
  return (
      <Dialog.Title as="h1" className="text-center text-lg font-medium text-gray-900 mb-3 mt-3">
          { children }
      </Dialog.Title>
  )
}
