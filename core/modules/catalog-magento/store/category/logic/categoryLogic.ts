import FilterVariant from 'core/modules/catalog-magento/types/FilterVariant';

export const compareByLabel = ( a, b ) => {
  if ( a.label < b.label ){
    return -1
  }
  if ( a.label > b.label ){
    return 1
  }
  return 0
}

export const getSystemFilterNames:Array<String> = ['sort']

export const changeFilterQuery = ({currentQuery = {}, filterVariant}:{currentQuery?:any, filterVariant?:FilterVariant} = {}) => {
  const newQuery = JSON.parse(JSON.stringify(currentQuery))
  if (!filterVariant) return newQuery
  if (getSystemFilterNames.includes(filterVariant.type)) {
    if (newQuery[filterVariant.type] && newQuery[filterVariant.type] === filterVariant.id) {
      delete newQuery[filterVariant.type]
    } else {
      newQuery[filterVariant.type] = filterVariant.id
    }
  } else {
    let queryFilter = newQuery[filterVariant.type] || []
    if (!Array.isArray(queryFilter)) queryFilter = [queryFilter]
    if(queryFilter.includes(filterVariant.id)) {
      queryFilter = queryFilter.filter(value => value !== filterVariant.id)
    } else {
      queryFilter.push(filterVariant.id)
    }
    newQuery[filterVariant.type] = queryFilter
  }
  return newQuery
}