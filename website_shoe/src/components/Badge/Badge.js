import React from 'react'
import classnames from 'classnames'

const Badge = ({ className, rounded = 'xl', children, ...rest }) => {
  return (
    <span {...rest} className={classnames('py-1 px-1', rounded === true ? 'rounded' : `rounded-${rounded}`, className)}>
      {children}
    </span>
  )
}

export default Badge
