import { Grid as MGrid, GridProps } from '@mantine/core'

const { Col: GridCol } = MGrid

export function Grid(props: GridProps) {
  return (
    <MGrid
      grow={true}
      gutter={'md'}
      {...props}
    />
  )
}

export { GridCol }
