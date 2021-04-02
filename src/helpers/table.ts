export function paginateData<T = any>(
  data: Array<T>,
  page: number,
  entriesPerPage: number,
): Array<T> {
  const start = (page - 1) * entriesPerPage
  const end = page * entriesPerPage

  return data.slice(start, end)
}
