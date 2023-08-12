import React from 'react'
import classnames from 'classnames'
export default function Button({ onClick, pending, isLoading, children, className, background, backgroundHover }) {
  return (
    <button className={classnames(
        "rounded-lg px-10 py-3 mt-5 flex items-center text-white",
        {"bg-[#62B4FF]": !background},
        {
            "hover:bg-[#349eff]": !backgroundHover
        },
        {
            "opacity-50": isLoading
        },
        {
            "opacity-50": pending
        },
        className
    )}
        onClick={onClick}
          disabled={pending}
    >
          {children}
          {
              isLoading && (
                  <img src="/images/icon/loading.gif" alt="icon" width={20} className="ml-2" />
              )
          }
    </button>
  )
}
