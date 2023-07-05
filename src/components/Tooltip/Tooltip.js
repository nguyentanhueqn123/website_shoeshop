import React from 'react'
import classnames from 'classnames'

export default function Tooltip({ children, className, classNameTooltip, tooltip, isShow = true }) {
  return (
   <>
    {
      isShow ? (
          <div className={classnames("group", className)}>
            {children}
            <div
              className={classnames("group-hover:visible invisible whitespace-nowrap absolute rounded-lg text-white p-2 border bg-black-2 text-center",
                classNameTooltip)}>
              {tooltip}
            </div>
          </div>
      ) : null
    }
   </>
  )
}
