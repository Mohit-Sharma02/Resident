export interface Paginated<T = unknown> {
  totalResults: number
  totalPages: number
  entries: Array<T>
}
