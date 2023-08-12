
export const PRODUCT_STATUS = {
    delivered: {
        label: 'DELIVERED',
        value: 'Delivered',
    },
    pending: {
        label: 'PENDING',
        value: 'Pending',
    },
    processing: {
        label: 'PROCESSING',
        value: 'Processing',
    },
    cancel: {
        label: 'CANCEL',
        value: 'Cancel',
    },
}

export const PRODUCT_STATUS_COLOR = {
    delivered: '#0e9f6e',
    pending: '#3f83f8',
    processing:'#ff5a1f',
    cancel: '#c43c3d',
}

export const COUPON_STATUS = {
    expired: {
        label: 'Expired',
        value: 'Expired',
        color: '#9b1c1c',
    },
    active: {
        label: 'Active',
        value: 'Active',
        color: '#00BDD9'
    }
}
export const SIZE = {
    37: {
        label: '37',
        value: '37',
        color: '#9b1c1c',
    },
    38: {
        label: '38',
        value: '38',
        color: '#9b1c1c',
    },
    39: {
        label: '39',
        value: '39',
        color: '#9b1c1c',
    },
    40: {
        label: '40',
        value: '40',
        color: '#9b1c1c',
    },
    41: {
        label: '41',
        value: '41',
        color: '#9b1c1c',
    },
    42: {
        label: '42',
        value: '42',
        color: '#9b1c1c',
    },
    43: {
        label: '43',
        value: '43',
        color: '#9b1c1c',
    },
}

export const STAFF_ROLE = {
    admin: {
        label: 'Admin',
        value: 'Admin',
    },
    staff: {
        label: 'Staff',
        value: 'Staff',
    },
    manager: {
        label: 'Manager',
        value: 'Manager',
    },
    // accountant: {
    //     label: 'Accountant',
    //     value: 'Accountant',
    // },
    // 'delivery_person': {
    //     label: 'Delivery person',
    //     value: 'Delivery person',
    // },
}

export const ORDER_TYPE = {
    ASC: 'asc',
    DESC: 'desc',
}

export const SORT_PRODUCT_PRICE = {
    LOWEST_PRICE: {
        label: 'Low to High',
        value: 'LOWEST_PRICE',
        field: 'price',
        type: ORDER_TYPE.ASC,
    },
    HIGHEST_PRICE: {
        label: 'High to Low',
        value: 'HIGHEST_PRICE',
        field: 'price',
        type: ORDER_TYPE.DESC,
    },
}

export const SORT_PRODUCT_COST = {
    LOWEST_PRICE: {
        label: 'Low to High',
        value: 'LOWEST_PRICE',
        field: 'cost',
        type: ORDER_TYPE.ASC,
    },
    HIGHEST_PRICE: {
        label: 'High to Low',
        value: 'HIGHEST_PRICE',
        field: 'cost',
        type: ORDER_TYPE.DESC,
    },
}


export const SORT_PRODUCT_PAGE_PRODUCT = {
    LOWEST_PRICE: {
        label: 'Price: Low to High',
        value: 'LOWEST_PRICE',
        field: 'priceSale',
        type: ORDER_TYPE.ASC,
    },
    HIGHEST_PRICE: {
        label: 'Price: High to Low',
        value: 'HIGHEST_PRICE',
        field: 'priceSale',
        type: ORDER_TYPE.DESC,
    },
    NEWEST: {
        label: 'Newest',
        value: 'NEWEST',
        field: 'createAt',
        type: ORDER_TYPE.DESC,
    },
    OLDEST: {
        label: 'Oldest',
        value: 'OLDEST',
        field: 'createAt',
        type: ORDER_TYPE.ASC,
    },
}

export const FILTER_PRICE_PRODUCT = {
    UNDER_3_MIL: {
        from: 0,
        to: '3000000',
    },
    FROM_3_TO_5_MIL: {
        from: '3000000',
        to: '5000000',
    },
    FROM_5_TO_10_MIL: {
        from: '5000000',
        to: '10000000',
    },
    ABOVE_10_MIL: {
        from: '10000000',
        to: '100000000',
    }
}