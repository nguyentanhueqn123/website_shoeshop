import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const CheckBox = ({ className, checked, onChange, label, id, ...rest }) => {
    const [value, setValue] = useState(false)
    const [isChecked, setIsChecked] = useState(checked)

    useEffect(() => {
        setIsChecked(checked)
    }, [checked])

    return (
        <div className={classnames('flex items-center my-1', className)}>
            <input
                {...rest}
                id={id}
                type="checkbox"
                value={value}
                checked={isChecked}
                className="custom-checkbox border-2 border-blue2 mr-2 rounded"
                onChange={(e) => {
                    onChange(e.target.checked)
                    setValue(e.target.value)
                }}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    )
}

CheckBox.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
}

export default CheckBox
