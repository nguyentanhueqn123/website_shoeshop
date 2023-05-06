export const formatQueryProducts = (query) => {
    const _query = typeof query === 'object' ? query : JSON.parse(query)
    let queryObj = {}
    if (_query?.data?.textSearch) {
        queryObj.textSearch = _query.data.textSearch
    }
    if (_query?.data?.sort?.value) {
        queryObj.orderBy = _query.data.sort.field
        queryObj.order = _query.data.sort.type
    }

    if (_query?.data?.nameAccount?.value) {
        queryObj.nameAccount = _query.data.nameAccount.value
    }

    if (_query?.data?.typeId?._id) {
        queryObj.typeId = _query.data.typeId._id
    }
    
    if (_query?.data?.status?.value) {
        queryObj.status = _query.data.status.value
    }

    if(_query?.data?.role?.value) {
        queryObj.role = _query.data.role.value
    }

    if (_query?.data?.typeIdArray?.length) {
        queryObj.typeId = _query?.data?.typeIdArray.join(',')
    }

    return queryObj
}