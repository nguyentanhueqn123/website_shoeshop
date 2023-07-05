const arrayToObject = (array, key, value) => {
    if (array?.length) {
        return array.reduce(
            (obj, item) => ({
                ...obj,
                [item[key]]: item[value],
            }),
            {},
        )
    }
}

export default arrayToObject