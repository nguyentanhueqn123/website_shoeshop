import React from 'react'
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

export default function CartIcon({ className, isInCart, ...ref }) {
    const { t } = useTranslation("general");
    return (
        <div className={classnames("absolute opacity-0 duration-300 ease-linear transition-opacity", className)} {...ref}>
            <div className={classnames({ " text-white": isInCart }, "bg-[#62B4FF] hover:bg-[#349eff] rounded-lg text-white p-3 relative flex items-center justify-center cart-icon")}>
                <p className="text-sm-md uppercase">
                    {t('addCart')}
                </p>
            </div>
        </div>
    )
}
