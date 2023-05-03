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
  Image,
  Input,
  useToast,
  Divider,
  Select,
  Grid,
  GridItem,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  useColorModeValue,
  FormErrorMessage,
  Checkbox,
} from '@chakra-ui/react';
import TableLoader from '../components/TableLoader';
import { fetchSizes } from '../utils/products';
import { addSize, toggleSize } from '../utils/sc';
import { approveStore, pendingApprovals } from '../utils/vendors';
import ImgCard from '../components/ImgCard';
import AddLicense from '../components/AddLicense';

const Sizes = () => {
  const [name, setName] = useState('');
  const [getData, setGetData] = useState(false);
  const [vendor, setVendor] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(20);
  const [sampleData, setSampleData] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterPin, setFilterPin] = useState('');
  const [filterDisabled, setDisabled] = useState('all');
  const [addVendor, setAddVendor] = useState(false);
  const [files, setFiles] = useState([]);
  const [license, setLicense] = useState();
  const [location, setLocation] = useState({
    lat: 28.6,
    lng: 77.2,
  });
  const {
    isOpen: isImgOpen,
    onOpen: onImgOpen,
    onClose: onImgClose,
  } = useDisclosure();

  const toast = useToast();
  const cs = useColorModeValue('black', 'cyan');
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await pendingApprovals();
      console.log(data.data.stores);
      setSampleData(data.data.stores);
      setLoading(false);
    };

    fetchData();
  }, [getData]);

  const handleImageModal = item => {
    onImgOpen();
    setVendor(item);
  };

  return (
    <Box p={{ base: 2, md: 2 }}>
      <Flex justifyContent={'space-between'} mx={5}>
        <Heading>PENDING APPROVALS</Heading>
      </Flex>

      <TableContainer
        border={'2px solid'}
        borderColor={cs}
        mt={5}
        borderRadius={20}
        px={10}
        py={5}
      >
        <Box height={'60vh'} overflowY={'auto'}>
          <Table colorScheme={cs}>
            <Thead>
              <Tr>
                <Th py={5} textAlign={'center'}>
                  Store Id
                </Th>
                <Th textAlign={'center'}>Name</Th>
                <Th textAlign={'center'}>Contact</Th>
                <Th textAlign={'center'}>Email</Th>
                <Th textAlign={'center'}>License No.</Th>
                <Th textAlign={'center'}>Address</Th>
                <Th textAlign={'center'}>Pin Code</Th>
                <Th textAlign={'center'}>Disabled</Th>
                <Th textAlign={'center'}>Images</Th>
                <Th textAlign={'center'}>Document</Th>
                <Th textAlign={'center'}>Edit</Th>
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
                <Td>
                  <TableLoader />
                </Td>
                <Td>
                  <TableLoader />
                </Td>
                <Td>
                  <TableLoader />
                </Td>
                <Td>
                  <TableLoader />
                </Td>
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
            <Tbody>
              {!loading &&
                sampleData
                  ?.slice(page * items - items, page * items)
                  ?.map(vendor => (
                    <Tr>
                      <Td textAlign={'center'}>{vendor?._id}</Td>
                      <Td textAlign={'center'}>{vendor?.name}</Td>
                      <Td textAlign={'center'}>{vendor?.contact}</Td>
                      <Td textAlign={'center'}>{vendor?.email}</Td>
                      <Td textAlign={'center'}>{vendor?.license}</Td>
                      <Td textAlign={'center'}>{vendor?.address}</Td>
                      <Td textAlign={'center'}>{vendor?.pincode}</Td>
                      <Td textAlign={'center'}>
                        <Checkbox
                          // border={useColorModeValue('black', 'cyan')}
                          isChecked={vendor?.disabled}
                        />
                      </Td>
                      <Td textAlign={'center'}>
                        <Button
                          onClick={() => {
                            handleImageModal(vendor);
                          }}
                        >
                          Images
                        </Button>
                      </Td>
                      <Td textAlign={'center'}>
                        {/* <AddLicense id={vendor?._id} doc={vendor?.licenseDoc} /> */}
                        <Button
                          onClick={() =>
                            window.open(vendor?.licenseDoc?.fileurl)
                          }
                          mr={3}
                        >
                          License
                        </Button>
                      </Td>
                      <Td textAlign={'center'}>
                        <Button
                          onClick={async () => {
                            const res = await approveStore(vendor?._id);

                            if (res?.status === 'success') {
                              toast({
                                title: 'Store Approved',
                                description: 'Store Approved Successfully',
                                status: 'success',
                                duration: 2000,
                                isClosable: true,
                              });
                              setGetData(!getData);
                            } else {
                              toast({
                                title: 'Error',
                                description: 'Something went wrong',
                                status: 'error',
                                duration: 2000,
                                isClosable: true,
                              });
                              onClose();
                            }
                          }}
                        >
                          Approve
                        </Button>
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
          </Table>
        </Box>
        <Flex my={5} justifyContent={'center'} alignItems={'center'}>
          <Text>PAGE: &nbsp;&nbsp;</Text>
          <NumberInput
            min={1}
            max={
              sampleData?.length > items
                ? Math.ceil(sampleData.length / items)
                : 1
            }
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
          <Input
            w={'20%'}
            value={items}
            onChange={e => setItems(e.target.value)}
          />
        </Flex>
      </TableContainer>

      <Modal
        isOpen={isImgOpen}
        size={'4xl'}
        onClose={() => {
          setGetData(!getData);
          onImgClose();
        }}
      >
        <ModalOverlay />
        <ModalContent p={5} my={5}>
          <ModalHeader>Images</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex ml={20}>
              <Grid templateColumns={'repeat(3, 250px)'}>
                {/* {console.log(product)} */}
                {vendor?.images?.map((img, idx) => (
                  <GridItem w={350} p={3}>
                    <ImgCard image={img} id={vendor?._id} isVendor={true} />
                  </GridItem>
                ))}
                {vendor?.images?.length < 5 &&
                  [...Array(5 - vendor?.images?.length)].map((_, idx) => (
                    <GridItem w={350} p={3}>
                      <ImgCard id={vendor?._id} isVendor={true} />
                    </GridItem>
                  ))}
              </Grid>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Sizes;
