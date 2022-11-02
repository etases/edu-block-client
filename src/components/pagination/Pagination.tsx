import { Pagination as MPagination, PaginationProps } from '@mantine/core'

export function Pagination(props: PaginationProps) {
  return (
    <MPagination
      size={'xl'}
      radius={'md'}
      {...props}
    />
  )
}
