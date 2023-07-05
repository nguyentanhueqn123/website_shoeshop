

export const ADD_ITEM_TO_JUST_VIEW = {
    get: () => {
        localStorage?.getItem('JUST_VIEW_PRODUCT')
    },
    set: (newValue) => {
        localStorage?.setItem('JUST_VIEW_PRODUCT', newValue)
    },
    delete: () => localStorage?.removeItem('JUST_VIEW_PRODUCT'),
}

export const USER_LOGIN = {
    get: () => {
        localStorage?.getItem("USER_LOGIN")
    },
    set: (newValue) => {
        localStorage?.setItem("USER_LOGIN", newValue)
    },
    delete: () => localStorage?.removeItem("USER_LOGIN")
}