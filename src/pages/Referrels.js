import React, { useEffect, useState } from 'react';
import {
  Text,
  Heading,
  Box,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Button,
  FormLabel,
  Input,
  useToast,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  NumberInput,
  useColorModeValue,
} from '@chakra-ui/react';
import TableLoader from '../components/TableLoader';
import {
  generateReferrelCode,
  fetchCodeReferrels,
  fetchReferrelCode,
} from '../utils/referrels';

const Referrels = () => {
  const [getData, setGetData] = useState(false);
  const [getData1, setGetData1] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [referrelCode, setReferrelCode] = useState('');
  const [sampleData, setSampleData] = useState('');
  const [page, setPage] = useState(1);
  const cs = useColorModeValue('black', 'cyan');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchReferrelCode();
      setReferrelCode(data?.data?.code);
      setLoading(false);
      setGetData1()
    };
    fetchData();
  }, [getData]);


  useEffect(() => {
    const fetchReferrel = async () => {
      setLoading(true);
        const data1 = await fetchCodeReferrels(referrelCode._id);
        setSampleData(data1?.data?.referrals);
      setLoading(false);
    };
    fetchReferrel();
  }, [getData1]);

  const toast = useToast();


  const generateCode = async () => {
    const data = await generateReferrelCode();
    setReferrelCode(data?.data?.code);
  };

  return (
    <Box p={{ base: 2, md: 5 }}>
      <Heading>REFERRELS</Heading>
      <TableContainer
        border={'2px solid'}
        borderColor={cs}
        mt={10}
        borderRadius={20}
        px={10}
        py={5}
      >
        {referrelCode === null ? (
          <Flex p={5} justifyContent={'space-between'}>
            <Button
              mx={5}
              px={10}
              colorScheme="teal"
              onClick={() => generateCode()}
            >
              Generate Referrel Code
            </Button>
          </Flex>
        ) : (
          <>
            <FormLabel>Your Referrel Code</FormLabel>
            <Flex p={1}>
              <Input
                mx={5}
                value={referrelCode.code}
                // onChange={e => setReferrelCode(e.target.value)}
                width={'fit-content'}
                readOnly
                placeholder="Referrel Code"
              />
              <Button
                mx={5}
                px={10}
                colorScheme="teal"
                onClick={() =>
                  setCopied(true) &&
                  navigator.clipboard.writeText(referrelCode.code)
                }
              >
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </Flex>
          </>
        )}

        <Table colorScheme={cs}>
        <Thead>
          <Tr>
            <Th textAlign={'center'}>#</Th>
            <Th textAlign={'center'}>Name</Th>
            <Th textAlign={'center'}>Time</Th>
          </Tr>
        </Thead>
        {loading && (
          <Tr>
            <Td>
              <TableLoader />
            </Td>
            <Td>
              <TableLoader />
            </Td>
            <Td>
              <TableLoader />
            </Td>
          </Tr>
        )}

        {!loading && (
          <Tbody>
            {sampleData
              ? sampleData?.map((user, index) => (
                  <Tr key={index}>
                    <Td textAlign={'center'}>{index + 1}</Td>
                    <Td textAlign={'center'}>{user?.user?.name}</Td>
                    <Td textAlign={'center'}>{user?.createdAt}</Td>
                  </Tr>
                ))
              : null}
          </Tbody>
        )}
      </Table>
        {/* <Table1 referrelId={referrelCode?._id} /> */}
        <Flex my={5} justifyContent={'center'} alignItems={'center'}>
          <Text>PAGE: &nbsp;&nbsp;</Text>
          <NumberInput
            min={1}
            // max={sampleData.length > items ? sampleData.length / items : 1}
            w={'20%'}
            value={page}
            onChange={e => setPage(e)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text ml={5}>Items/Page: &nbsp; &nbsp;</Text>
          <Input w={'20%'} />
        </Flex>
      </TableContainer>
    </Box>
  );
};

export default Referrels;
