import { Wrap } from '@chakra-ui/react'
import React from 'react'

interface InfinityGridProps<T> {
  items: T[]
  render: (i: T) => JSX.Element
  Skeleton: React.FC | React.ElementType
  skeletonCount?: number
  loading?: boolean
}

function InfinityGrid<T>({
  items,
  render,
  skeletonCount = 5,
  loading = false,
  Skeleton,
}: InfinityGridProps<T>): JSX.Element {
  return (
    <Wrap minH={300} spacing={8} mt={4}>
      {items.map(item => render(item))}
      {loading &&
        '.'
          .repeat(skeletonCount)
          .split('')
          .map((_, i) => <Skeleton key={`skeleton-${i}-infinity-grid`} />)}
    </Wrap>
  )
}

export default InfinityGrid
