import { Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';

const TableLoader = () => {
  return (
    <Stack mt={{ base: 2, md: 10 }}>
      <Skeleton height="30px" />
      <Skeleton height="30px" />
      <Skeleton height="30px" />
      <Skeleton height="30px" />
      <Skeleton height="30px" />
    </Stack>
  );
};

export default TableLoader;
