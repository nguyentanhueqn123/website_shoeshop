import { toast } from 'react-toastify'
// import { CheckCircle } from 'react-feather'

import 'react-toastify/dist/ReactToastify.css'


export const Toast = ({ message }) => {
  return (
      <span>{message}</span>
  )
}

export function showToastSuccess(message) {
  toast.success(<Toast message={message} />, {   
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

export function showToastError(message) {
  toast.error(<Toast message={message} />, {   
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
}

