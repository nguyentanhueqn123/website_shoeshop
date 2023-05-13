import React from 'react'
import classnames from 'classnames';

export default function Container({ children, className }) {
  return (
      <div className={classnames("max-w-screen-xl mx-auto w-full flex", className)}>
        { children }
    </div>
  )
}
