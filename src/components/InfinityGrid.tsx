import { Grid } from '@chakra-ui/react';
import React from 'react';

interface InfinityGridProps<T> {
  items: T[];
  render: (i: T) => JSX.Element;
  Skeleton?: React.FC | React.ElementType;
  skeletonCount?: number;
}

function InfinityGrid<T>({
  items,
  render,
  skeletonCount = 5,
  Skeleton = () => <div />,
}: InfinityGridProps<T>): JSX.Element {
  return (
    <Grid
      templateColumns='repeat(auto-fill, minmax(220px, 1fr))'
      gridGap={4}
      minH={300}
      mt={4}>
      {items.map(item => render(item))}
      {'.'
        .repeat(skeletonCount)
        .split('')
        .map((_, i) => (
          <Skeleton
            key={`skeleton-${i}-infinity-grid-${Math.random()}-${Math.random()}`}
          />
        ))}
    </Grid>
  );
}

export default InfinityGrid;
