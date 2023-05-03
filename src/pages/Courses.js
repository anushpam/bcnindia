import React, { useEffect, useState } from 'react';
import {
  deleteCourse,
  deleteSubject,
  editCourse,
  editSubject,
  getCourses,
  getSubjects,
} from '../utils/courses';
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Divider,
  Select,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  NumberInput,
  useColorModeValue,
} from '@chakra-ui/react';
import TableLoader from '../components/TableLoader';

const sampleData = [
  {
    productId: '2798',
    productName: 'Red Wine',
    productBrand: 'Donelli',
    productRating: '4.5',
    imgUrl: 'https://m.media-amazon.com/images/I/61Vrn2CgG1L._SX679_.jpg',
  },
  {
    productId: '2798',
    productName: 'Red Wine',
    productBrand: 'Donelli',
    productRating: '4.5',
    imgUrl: 'https://m.media-amazon.com/images/I/61Vrn2CgG1L._SX679_.jpg',
  },
  {
    productId: '2798',
    productName: 'Red Wine',
    productBrand: 'Donelli',
    productRating: '4.5',
    imgUrl: 'https://m.media-amazon.com/images/I/61Vrn2CgG1L._SX679_.jpg',
  },
  {
    productId: '2798',
    productName: 'Red Wine',
    productBrand: 'Donelli',
    productRating: '4.5',
    imgUrl: 'https://m.media-amazon.com/images/I/61Vrn2CgG1L._SX679_.jpg',
  },
  {
    productId: '2798',
    productName: 'Red Wine',
    productBrand: 'Donelli',
    productRating: '4.5',
    imgUrl: 'https://m.media-amazon.com/images/I/61Vrn2CgG1L._SX679_.jpg',
  },
];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState(null);
  const [name, setName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getData, setGetData] = useState(false);
  const [loading, setLoading] = useState(true);

  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState(null);

  const [page, setPage] = useState(1);
  const cs = useColorModeValue('black', 'cyan');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getCourses();
      console.log(data.data.courses);
      setCourses(data.data.courses);
      setLoading(false);
    };

    fetchData();
  }, [getData]);

  const toast = useToast();

  return (
    <Box p={{ base: 2, md: 5 }}>
      <Heading>ENQUIRY</Heading>
      <TableContainer
        border={'2px solid'}
        borderColor={cs}
        mt={10}
        borderRadius={20}
        px={10}
        py={5}
      >
        <Flex p={5} justifyContent={'space-between'}>
          <Input
            mx={5}
            // value={filterName}
            // onChange={e => setFilterName(e.target.value)}
            placeholder="Enquiry ID"
          />
          <Input
            mx={5}
            // value={filterBrand}
            // onChange={e => setFilterBrand(e.target.value)}
            placeholder="Enquiry Type"
          />
          <Button mx={5} px={10} colorScheme="teal">
            Filter
          </Button>
        </Flex>
        <Table colorScheme={cs}>
          <Thead>
            <Tr>
              <Th textAlign={'center'}>Enquiry ID</Th>
              <Th textAlign={'center'}>Enquiry Type</Th>
              <Th textAlign={'center'}>Enquiry By</Th>
              <Th textAlign={'center'}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sampleData?.map((product, index) => (
              <Tr>
                <Td textAlign={'center'}>21767</Td>
                <Td textAlign={'center'}>Error</Td>
                {/* <Td textAlign={'center'}>{product.productBrand}</Td> */}
                <Td textAlign={'center'}>Magneto</Td>
                <Td textAlign={'center'}>
                  <Button
                    onClick={() => {
                      // setAddModal(false);
                      // handleModal(product);
                    }}
                  >
                    Edit
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
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

export default Courses;
