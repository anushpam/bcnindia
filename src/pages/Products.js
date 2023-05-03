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
} from '@chakra-ui/react';
import TableLoader from '../components/TableLoader';
import ShopCard from '../components/ShopCard';
import {
  Addproduct,
  getFilteredProducts,
  getProducts,
  updateProduct,
  deleteProduct,
  fetchCategories,
} from '../utils/products';
import ImgCard from '../components/ImgCard';

const Products = () => {
  const [name, setName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getData, setGetData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(20);
  const [sampleData, setSampleData] = useState([]);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [addmodal, setAddModal] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [addProduct, setAddProduct] = useState({});
  const {
    isOpen: isImgOpen,
    onOpen: onImgOpen,
    onClose: onImgClose,
  } = useDisclosure();

  const cs = useColorModeValue('black', 'cyan');
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getProducts();
      console.log(data.data.products);
      setSampleData(data.data.products);
      const cat = await fetchCategories('?disabled=false');
      console.log(cat);
      setCategories(cat.data.categories);
      setLoading(false);
    };

    fetchData();
  }, [getData]);

  const filterData = async () => {
    setLoading(true);
    const data = await getFilteredProducts(filterName, filterBrand);
    console.log(data);
    setSampleData(data.data.products);
    setLoading(false);
  };

  const handleModal = item => {
    onOpen();
    setProduct(item);
    // console.log(product);
  };

  const handleImageModal = item => {
    onImgOpen();
    setProduct(item);
  };

  const handleAddProduct = () => {
    setProduct({ images: [] });
    onOpen();
    setAddModal(true);
  };

  const handleDelete = async () => {
    const data = await deleteProduct(product._id);
    console.log(data);
    if (data.status === 'success') {
      toast({
        title: 'Product Deleted',
        description: 'Product deleted successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setGetData(!getData);
      onClose();
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      onClose();
    }
  };

  const handleUpdateProduct = async () => {
    if (!product?.name || !product?.supplierName || !product?.type) {
      toast({
        title: 'Error',
        description: 'Please fill the required fields',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const formData = {
      name: product?.name,
      supplierName: product?.supplierName,
      year: product?.year,
      category: product?.categoryId?.category,
      subcategory: product?.categoryId?.subcategory,
      country: product?.categoryId?.country,
      type: product?.categoryId?.type,
    };
    console.log(formData);
    const res = await updateProduct(product._id, formData);
    console.log(res);
    if (res.status === 'success') {
      toast({
        title: 'Success',
        description: 'Product updated successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      //setLoading(false);
      onClose();
      setGetData(!getData);
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      onClose();
    }
  };

  const handleSubmit = async () => {
    if (
      !addProduct?.name ||
      !addProduct?.supplierName ||
      !addProduct?.categoryId?.type
    ) {
      toast({
        title: 'Error',
        description: 'Please fill the required fields',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const formData = new FormData();
    formData.append('supplierName', addProduct?.supplierName);
    formData.append('name', addProduct?.name);
    formData.append('year', addProduct?.year);
    formData.append('category', addProduct?.category);
    formData.append('subcategory', addProduct?.subcategory);
    formData.append('country', addProduct?.country);
    formData.append('type', addProduct?.type);
    // formData.append('prices', JSON.stringify(product.prices));
    // formData.append('description', product.description);
    for (let i = 0; i < addProduct?.images?.length; i++) {
      formData.append('images', addProduct?.images[i]);
    }
    // formData.append('quantity', JSON.stringify(product.quantity));
    // formData.append('vendorId', product.vendorId);
    // formData.append('rating', product.rating);
    console.log(...formData);
    const res = await Addproduct(formData);
    // const res = { status: 'hello' };
    console.log(res);
    if (res.status === 'success') {
      toast({
        title: 'Product Added',
        description: 'Product added successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Product not added',
        description: 'Product not added',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
    onClose();
    setGetData(!getData);
  };

  const catList = () => {
    const cats = categories
      ?.map(item => item.category)
      ?.filter((val, i, self) => self.indexOf(val) == i);
    // console.log(cats);
    return cats;
  };

  const subCatList = cat => {
    const subCats = categories
      ?.filter(item => item?.category === cat)
      ?.map(item => item.subcategory)
      ?.filter((val, i, self) => self.indexOf(val) == i);

    // console.log(subCats);
    return subCats;
  };

  const countryList = (cat, subcat) => {
    const countries = categories
      ?.filter(item => item?.category === cat)
      ?.filter(item => item?.subcategory === subcat)
      ?.map(item => item.country)
      ?.filter((val, i, self) => self.indexOf(val) == i);

    // console.log(countries);
    return countries;
  };

  const typeList = (cat, subcat, country) => {
    const types = categories
      ?.filter(item => item?.category === cat)
      ?.filter(item => item?.subcategory === subcat)
      ?.filter(item => item?.country === country)
      ?.map(item => item.type)
      ?.filter((val, i, self) => self.indexOf(val) == i);

    // console.log(types);
    return types;
  };

  return (
    <Box p={{ base: 2, md: 2 }}>
      <Flex justifyContent={'space-between'} mx={5}>
        <Heading>PRODUCTS</Heading>
        <Button colorScheme={'#FC4C02'} onClick={handleAddProduct}>
          Add Product
        </Button>
      </Flex>
      {/* {loading && <TableLoader />} */}

      {/* )} */}

      {/* <SimpleGrid mt={10} minChildWidth="300px" spacing="20px">
          <ShopCard
            onClick={() => {
              console.log('clicked');
              onOpen();
            }}
          />
          <ShopCard />
          <ShopCard />
          <ShopCard />
          <ShopCard />
        </SimpleGrid> */}
      <TableContainer
        border={'2px solid'}
        borderColor={cs}
        borderRadius={20}
        mt={5}
        px={10}
        py={5}
      >
        <Flex p={5} justifyContent={'space-between'}>
          <Input
            mx={5}
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
            placeholder="Product Name"
          />
          {/*<Input
            mx={5}
            value={filterBrand}
            onChange={e => setFilterBrand(e.target.value)}
            placeholder="Supplier Name"
      />*/}
          <Button onClick={filterData} mx={5} px={10} colorScheme="teal">
            Search
          </Button>
        </Flex>
        <Box height={'60vh'} overflowY={'auto'}>
          <Table colorScheme={cs}>
            <Thead>
              <Tr>
                <Th textAlign={'center'}>Product ID</Th>
                <Th textAlign={'center'}>Supplier Name</Th>
                <Th textAlign={'center'}>Brand Name</Th>
                <Th textAlign={'center'}>Category</Th>
                <Th textAlign={'center'}>Sub Category</Th>
                <Th textAlign={'center'}>Country</Th>
                <Th textAlign={'center'}>Type</Th>
                <Th textAlign={'center'}>Year</Th>
                <Th textAlign={'center'}>Images</Th>
                <Th textAlign={'center'}>Add Button</Th>
              </Tr>
            </Thead>
            <Tbody>
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
              {!loading &&
                sampleData
                  .slice(page * items - items, page * items)
                  ?.map((product, index) => (
                    <Tr>
                      <Td textAlign={'center'}>{product?._id}</Td>
                      <Td textAlign={'center'}>{product?.supplierName}</Td>
                      <Td textAlign={'center'}>{product.name}</Td>
                      <Td textAlign={'center'}>
                        {product?.categoryId?.category}
                      </Td>
                      <Td textAlign={'center'}>
                        {product?.categoryId?.subcategory}
                      </Td>
                      <Td textAlign={'center'}>
                        {product?.categoryId?.country}
                      </Td>
                      <Td textAlign={'center'}>{product?.categoryId?.type}</Td>
                      <Td textAlign={'center'}>{product?.year}</Td>
                      <Td textAlign={'center'}>
                        {/* <Flex>
                          {product?.images?.map((image, index) => (
                            <Image
                              px={2}
                              borderRadius={5}
                              src={image.fileurl}
                              width={50}
                              height={50}
                              key={index}
                            />
                          ))}
                        </Flex> */}
                        <Button
                          onClick={() => {
                            handleImageModal(product);
                          }}
                        >
                          Images
                        </Button>
                      </Td>
                      <Td textAlign={'center'}>
                        <Button
                          onClick={() => {
                            setAddModal(false);
                            handleModal(product);
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
                ? Math.ceil(sampleData?.length / items)
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

      <Modal onClose={onClose} size={'5xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent p={5} mt={10}>
          <ModalHeader>
            {addmodal ? 'ADD PRODUCT' : 'PRODUCT DETAILS'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Box w={'50%'} p={5}>
                {!addmodal && (
                  <FormControl mt={3}>
                    <FormLabel>Product Id</FormLabel>
                    <Input value={product?._id} contentEditable={false} />
                  </FormControl>
                )}
                <FormControl
                  mt={3}
                  isRequired
                  isInvalid={
                    addmodal
                      ? addProduct?.supplierName === ''
                      : product?.supplierName === ''
                  }
                >
                  <FormLabel>Supplier Name</FormLabel>
                  <Input
                    value={
                      addmodal
                        ? addProduct?.supplierName
                        : product?.supplierName
                    }
                    onChange={e => {
                      if (addmodal) {
                        setAddProduct({
                          ...addProduct,
                          supplierName: e.target.value,
                        });
                      } else {
                        setProduct({
                          ...product,
                          supplierName: e.target.value,
                        });
                      }
                    }}
                  />
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>

                <FormControl
                  mt={3}
                  isRequired
                  isInvalid={
                    addmodal ? addProduct?.name === '' : product?.name === ''
                  }
                >
                  <FormLabel>Brand Name</FormLabel>
                  <Input
                    value={addmodal ? addProduct?.name : product?.name}
                    onChange={e => {
                      if (addmodal) {
                        setAddProduct({ ...addProduct, name: e.target.value });
                      } else {
                        setProduct({ ...product, name: e.target.value });
                      }
                    }}
                  />
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>

                <FormControl mt={3}>
                  <FormLabel>Year</FormLabel>
                  <Input
                    value={addmodal ? addProduct?.year : product?.year}
                    onChange={e => {
                      if (addmodal) {
                        setAddProduct({ ...addProduct, year: e.target.value });
                      } else {
                        setProduct({ ...product, year: e.target.value });
                      }
                    }}
                  />
                </FormControl>
                {/* <FormControl mt={3}>
                  <FormLabel>Size</FormLabel>
                  {/* <Input
                    value={addProduct?.size}
                    onChange={e => {
                      setAddProduct({ ...addProduct, size: e.target.value });
                    }}
                  />
                  <Select
                    value={addProduct?.size}
                    onChange={e => {
                      // setSize(e.target.value);
                      setAddProduct({ ...addProduct, size: e.target.value });
                      // console.log(e.target.value);
                      console.log(addProduct);
                    }}
                  >
                    <option></option>
                    {sizes?.map((c, idx) => (
                      <option value={c.size}>
                        {c.size} {c.unit}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel>Cost</FormLabel>
                  <Input
                    value={addProduct?.cost}
                    onChange={e => {
                      setAddProduct({ ...addProduct, cost: e.target.value });
                    }}
                  />
                </FormControl> */}
                {addmodal && (
                  <FormControl mt={3}>
                    <FormLabel>Images</FormLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      // value={p?.images}
                      onChange={e => {
                        if (addmodal) {
                          setAddProduct({
                            ...addProduct,
                            images: Object.values(e.target.files),
                          });
                        } else {
                          setProduct({
                            ...product,
                            images: Object.values(e.target.files),
                          });
                        }
                      }}
                    />
                  </FormControl>
                )}
              </Box>
              <Box p={5} w={'50%'}>
                <FormControl>
                  <FormLabel mt={3}>Category</FormLabel>
                  <Select
                    value={
                      addmodal
                        ? addProduct?.category
                        : product?.categoryId?.category
                    }
                    onChange={e =>
                      addmodal
                        ? setAddProduct({
                            ...addProduct,
                            category: e.target.value,
                          })
                        : setProduct({
                            ...product,
                            categoryId: {
                              ...product?.categoryId,
                              category: e.target.value,
                            },
                          })
                    }
                  >
                    <option></option>
                    {catList()?.map((c, idx) => (
                      <option>{c}</option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl mt={3}>
                  <FormLabel>Subcategory</FormLabel>
                  <Select
                    value={
                      addmodal
                        ? addProduct?.subcategory
                        : product?.categoryId?.subcategory
                    }
                    onChange={e =>
                      addmodal
                        ? setAddProduct({
                            ...addProduct,
                            subcategory: e.target.value,
                          })
                        : setProduct({
                            ...product,
                            categoryId: {
                              ...product?.categoryId,
                              subcategory: e.target.value,
                            },
                          })
                    }
                  >
                    <option></option>
                    {subCatList(
                      addmodal
                        ? addProduct?.category
                        : product?.categoryId?.category
                    )?.map((s, idx) => (
                      <option>{s}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mt={3}>
                  <FormLabel>Country</FormLabel>
                  <Select
                    value={
                      addmodal
                        ? addProduct?.country
                        : product?.categoryId?.country
                    }
                    onChange={e =>
                      addmodal
                        ? setAddProduct({
                            ...addProduct,
                            country: e.target.value,
                          })
                        : setProduct({
                            ...product,
                            categoryId: {
                              ...product?.categoryId,
                              country: e.target.value,
                            },
                          })
                    }
                  >
                    <option></option>
                    {countryList(
                      addmodal
                        ? addProduct?.category
                        : product?.categoryId?.category,
                      addmodal
                        ? addProduct?.subcategory
                        : product?.categoryId?.subcategory
                    )?.map((c, idx) => (
                      <option>{c}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  mt={3}
                  isRequired
                  isInvalid={
                    addmodal ? addProduct?.type === '' : product?.type === ''
                  }
                >
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={
                      addmodal ? addProduct?.type : product?.categoryId?.type
                    }
                    onChange={e =>
                      addmodal
                        ? setAddProduct({
                            ...addProduct,
                            type: e.target.value,
                          })
                        : setProduct({
                            ...product,
                            categoryId: {
                              ...product?.categoryId,
                              type: e.target.value,
                            },
                          })
                    }
                  >
                    <option></option>
                    {typeList(
                      addmodal
                        ? addProduct?.category
                        : product?.categoryId?.category,
                      addmodal
                        ? addProduct?.subcategory
                        : product?.categoryId?.subcategory,
                      addmodal
                        ? addProduct?.country
                        : product?.categoryId?.country
                    )?.map((t, idx) => (
                      <option>{t}</option>
                    ))}
                  </Select>
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            {!addmodal && (
              <Button colorScheme={'red'} mr={5} onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button
              colorScheme={'blue'}
              mr={5}
              onClick={addmodal ? handleSubmit : handleUpdateProduct}
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
                {product?.images?.map((img, idx) => (
                  <GridItem w={350} p={3}>
                    <ImgCard image={img} id={product?._id} />
                  </GridItem>
                ))}
                {product?.images?.length < 5 &&
                  [...Array(5 - product?.images?.length)].map((_, idx) => (
                    <GridItem w={350} p={3}>
                      <ImgCard id={product?._id} />
                    </GridItem>
                  ))}
              </Grid>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* <Divider mt={5} mb={10} /> */}
    </Box>
  );
};

export default Products;
