import React, { useEffect, useState } from 'react';
import {
  Text,
  Heading,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
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
  Select,
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
  Grid,
  GridItem,
} from '@chakra-ui/react';
import TableLoader from '../components/TableLoader';

import { updateVendor } from '../utils/vendors';

import ImgCard from '../components/ImgCard';
import MapComponent from '../components/MapPicker';

import { AddProduct, getProducts, getCategories, updateProduct } from '../utils/products';

const Businesses = ({ businessId }) => {
  const [name, setName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getData, setGetData] = useState(false);
  const [vendor, setVendor] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(20);
  const cs = useColorModeValue('black', 'cyan');
  const [sampleData, setSampleData] = useState([]);
  const [addVendor, setAddVendor] = useState(false);
  const [files, setFiles] = useState([]);
  const [catList, setCatList] = useState([]);
  const [subcatList, setSubcatList] = useState([]);
  const [uname, setUname] = useState('');
  const {
    isOpen: isImgOpen,
    onOpen: onImgOpen,
    onClose: onImgClose,
  } = useDisclosure();

  const toast = useToast();

  const handleImageModal = item => {
    onImgOpen();
    setVendor(item);
  };

  const getCategoryByName = categoryName => {
    return catList.find(cat => cat.category === categoryName) || {};
  };

  const getSubcategoryByName = subcategoryName => {
    const subcategories = getSubcategories(vendor?.categoryId?.category);
    const subcategory = subcategories.find(
      subcat => subcat.subcategory === subcategoryName
    );
    return subcategory || {};
  };

  const getSubcategories = categoryName => {
    const category = getCategoryByName(categoryName);
    if (!category.subcategories) return [];
    return category.subcategories;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getProducts(businessId);
      setSampleData(data.data.businessItems);
      setLoading(false);
    };

    const fetchCategories = async () => {
      setLoading(true);
      const data = await getCategories();
      setCatList(data.data.categories);
      setLoading(false);
    };

    fetchCategories();
    fetchData();
  }, [getData]);

  return (
    <Box p={{ base: 2, md: 2 }}>
      {/*Businesses Details Table*/}
      <Flex justifyContent={'space-between'} mx={5}>
        <Heading>Businesses</Heading>
        <Button
          colorScheme={'blue'}
          onClick={() => {
            setAddVendor(true);
            setVendor({});
            onOpen();
          }}
        >
          Add New Product
        </Button>
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
                  Index
                </Th>
                <Th textAlign={'center'}>Name</Th>
                <Th textAlign={'center'}>Images</Th>
                <Th textAlign={'center'}>Description</Th>
                <Th textAlign={'center'}>Price</Th>
                <Th textAlign={'center'}>Active</Th>
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
              </Tr>
            )}
            <Tbody>
              {!loading &&
                sampleData?.map((product, index) => (
                  <Tr>
                    <Td textAlign={'center'}>{index + 1}</Td>
                    <Td textAlign={'center'}>{product?.name}</Td>
                    <Td textAlign={'center'}>
                      <Button
                        onClick={() => {
                          handleImageModal(product);
                        }}
                      >
                        Images
                      </Button>
                    </Td>
                    <Td textAlign={'center'}>{product?.description}</Td>
                    <Td textAlign={'center'}>{product?.price}</Td>
                    {product.active ? (
                      <Td textAlign={'center'}>True</Td>
                    ) : (
                      <Td textAlign={'center'}>False</Td>
                    )}
                    <Td textAlign={'center'}>
                      <Button
                        onClick={() => {
                          setAddVendor(false);
                          setVendor(product);
                          onOpen();
                        }}
                      >
                        Edit
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

      {/**Form Modal To Add and Update Business */}
      <Modal onClose={onClose} size={'5xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent p={5} mt={10}>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Box w={'50%'} p={5}>
                {/* {addVendor && ( */}
                <FormControl
                  mt={3}
                  isInvalid={vendor?.name === ''}
                  isRequired={addVendor}
                >
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    borderColor={cs}
                    value={vendor?.name}
                    onChange={e => {
                      setUname(e.target.value);
                      setVendor({ ...vendor, name: e.target.value });
                    }}
                  />
                </FormControl>
                <FormControl
                  mt={3}
                  isInvalid={vendor?.price === ''}
                  isRequired={addVendor}
                >
                  <FormLabel>Price</FormLabel>
                  <Input
                    // required={true}
                    borderColor={cs}
                    onChange={e =>
                      setVendor({ ...vendor, price: e.target.value })
                    }
                    value={vendor?.price}
                  />
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>

                <FormControl
                  mt={3}
                  isInvalid={vendor?.description === ''}
                  isRequired={addVendor}
                >
                  <FormLabel>Description</FormLabel>
                  <Input
                    // required={true}
                    borderColor={cs}
                    onChange={e =>
                      setVendor({ ...vendor, description: e.target.value })
                    }
                    value={vendor?.description}
                  />
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>

                {/* {!addVendor && ( */}
                <FormControl
                  mt={3}
                  isInvalid={vendor?.active === ''}
                  isRequired={addVendor}
                >
                  <FormLabel>Active</FormLabel>
                  <Select
                    value={vendor?.active}
                    onChange={e =>
                      setVendor({ ...vendor, active: e.target.value })
                    }
                  >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                  </Select>
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>
                {/* )} */}
                {addVendor && (
                  <FormControl mt={3}>
                    <FormLabel>Product Image</FormLabel>
                    <Input
                      type={'file'}
                      accept={'image/*'}
                      multiple
                      borderColor={cs}
                      onChange={e => setFiles(e.target.files)}
                      value={vendor?.images}
                    />
                  </FormControl>
                )}
                <FormControl>
                  <FormLabel mt={3}>Category</FormLabel>
                  <Select
                    value={vendor?.categoryId?.category}
                    onChange={e => {
                      setVendor({
                        ...vendor,
                        categoryId: getCategoryByName(e.target.value),
                      });
                    }}
                  >
                    <option></option>
                    {catList?.map((c, idx) => (
                      <option value={c.category}>{c.category}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mt={3}>
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    value={vendor?.subcategoryId?.subcategory || ''}
                    onChange={e => {
                      setVendor({
                        ...vendor,
                        subcategoryId: getSubcategoryByName(e.target.value),
                      });
                    }}
                  >
                    <option></option>
                    {getSubcategories(vendor?.categoryId?.category).map(
                      (s, idx) => (
                        <option value={s.subcategory}>{s.subcategory}</option>
                      )
                    )}
                  </Select>
                </FormControl>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={
                !addVendor
                  ? async () => {
                      if (
                        !vendor.name ||
                        !vendor.description ||
                        !vendor.price ||
                        !vendor.active ||
                        !vendor?.categoryId?._id
                      ) {
                        toast({
                          title: 'Please fill all the fields',
                          status: 'error',
                          duration: 9000,
                          isClosable: true,
                        });
                        return;
                      }

                      const formData = {
                        name: vendor?.name,
                        description: vendor?.description,
                        prices: vendor?.price,
                        active: vendor?.active,
                        categoryId: vendor.categoryId._id,
                        subcategoryId: vendor.subcategoryId?.subcategoryId,
                      };

                      const res = await updateProduct(businessId, vendor?._id, formData);
                      if (res.status === 'success') {
                        toast({
                          title: 'Product Updated Successfully',
                          status: 'success',
                          duration: 5000,
                          isClosable: true,
                        });
                        setGetData(!getData);
                      } else {
                        toast({
                          title: 'Error in updating product',
                          // description: res.message,
                          status: 'error',
                          duration: 5000,
                          isClosable: true,
                        });
                      }
                      onClose();
                    }
                  : async () => {
                      if (
                        !vendor.name ||
                        !vendor.description ||
                        !vendor.price ||
                        !vendor?.categoryId?._id
                      ) {
                        toast({
                          title: 'Please fill all the fields',
                          status: 'error',
                          duration: 9000,
                          isClosable: true,
                        });
                        return;
                      }
                      const formData = new FormData();
                      formData.append('name', vendor?.name);
                      formData.append('description', vendor?.description);
                      formData.append('price', vendor?.price);
                      formData.append('categoryId', vendor?.categoryId?._id);
                      formData.append(
                        'subcategoryId',
                        vendor?.subcategoryId?.subcategoryId
                      );
                      formData.append('active', vendor.active);
                      formData.append('businessId', businessId);
                      for (let i = 0; i < files.length; i++) {
                        formData.append('images', files[i]);
                      }

                      const res = await AddProduct(businessId, formData);

                      if (res.status === 'success') {
                        toast({
                          title: 'Product Created Successfully',
                          status: 'success',
                          duration: 5000,
                          isClosable: true,
                        });
                        setGetData(!getData);
                      } else {
                        toast({
                          title: res.message || 'Error in creating Vendor',
                          // description: res.message,
                          status: 'error',
                          duration: 5000,
                          isClosable: true,
                        });
                      }
                      onClose();
                    }
              }
              colorScheme={'blue'}
              mr={5}
            >
              Save
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
                    <ImgCard
                      image={img}
                      id={vendor?._id}
                      name={'businessItem'}
                      isVendor={true}
                    />
                  </GridItem>
                ))}
                {vendor?.images?.length < 5 &&
                  [...Array(5 - vendor?.images?.length)].map((_, idx) => (
                    <GridItem w={350} p={3}>
                      <ImgCard
                        id={vendor?._id}
                        isVendor="true"
                        name={'businessItem'}
                      />
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

export default Businesses;
