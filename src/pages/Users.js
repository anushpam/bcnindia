import React, { useEffect, useState } from 'react';
import {
  Text,
  Heading,
  Box,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Select,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
// import TableLoader from '../components/TableLoader';
// import ShopCard from '../components/ShopCard';
import MapComponent from '../components/MapPicker';

import {
  getFilteredUsers,
  getUsers,
  addUser as createUser,
  deleteUser,
  updateUser,
  getUserProfile,
} from '../utils/users';
// import { getVendors } from '../utils/vendors';

const Users = () => {
  const [name, setName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getData, setGetData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(20);
  const cs = useColorModeValue('black', 'cyan');
  const [sampleData, setSampleData] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [addUser, setAddUser] = useState(false);
  const [location, setLocation] = useState({ lat: 28.6, lng: 77.2 });


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getUserProfile("62c5256d3df341b98a9d3b67");
      console.log(data);
      setSampleData(data.data.user);
      setLoading(false);
    };

    fetchData();
  }, [getData]);

  console.log(sampleData)
  const toast = useToast();

  // const handleUpdateUser = async () => {
  //   const res = await updateUser(user._id, user);
  //   if (res.status === 'success') {
  //     toast({
  //       title: 'Success',
  //       description: 'user updated successfully',
  //       status: 'success',
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //     //setLoading(false);
  //     onClose();
  //     setGetData(!getData);
  //   } else {
  //     toast({
  //       title: 'Error',
  //       description: 'Something went wrong',
  //       status: 'error',
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //     onClose();
  //   }
  // };

  return (
    <Box p={{ base: 2, md: 2 }}>
      <Flex justifyContent={'space-between'} mx={5}>
        <Heading>Profile</Heading>

      </Flex>

      <Flex>
              <Box w={'50%'} p={5}>
                <FormControl mt={3} isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={sampleData?.name}
                    // onChange={e => setUser({ ...user, name: e.target.value })}
                  />
                </FormControl>
                <FormControl mt={3} isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={sampleData?.email}
                    // onChange={e => setUser({ ...user, email: e.target.value })}
                  />
                </FormControl>
                <FormControl mt={3} isRequired>
                  <FormLabel>Contact</FormLabel>
                  <Input
                    type={'number'}
                    value={sampleData?.contact}
                    // onChange={e =>
                    //   setUser({ ...user, contact: Number(e.target.value) })
                    // }
                  />
                </FormControl>

                {/* <p>{sampleData.address.city}</p> */}
                <FormControl mt={3} isRequired>
                  <FormLabel>Address</FormLabel>
                  <Input
                    type={'number'}
                    value={sampleData?.address}
                    // onChange={e =>
                    //   setUser({ ...user, contact: Number(e.target.value) })
                    // }
                  />
                </FormControl>
              </Box>
              <Box w={'50%'} p={5}>
                <FormControl mt={3} isRequired>
                  <FormLabel>User Role</FormLabel>
                  <Select
                    placeholder="Select option"
                    value={sampleData?.role}
                    // onChange={e => setUser({ ...user, role: e.target.value })}
                  >
                    <option value="customer">Customer</option>
                    <option value="businessman">Businessman</option>
                  </Select>
                </FormControl>

                <MapComponent
                  def={sampleData?.location}
                  location={location}
                  setLocation={setLocation}
                />

              </Box>
            </Flex>

            {/* <Flex>
            <Box w={'50%'} p={5}>
                <FormControl mt={3} isRequired>
                  <FormLabel>Address</FormLabel>
                  <Select
                    placeholder="Select option"
                    value={sampleData?.role}
                    // onChange={e => setUser({ ...user, role: e.target.value })}
                  >
                    <option value="customer">Customer</option>
                    <option value="businessman">Businessman</option>
                  </Select>
                </FormControl>
              </Box>
              
            </Flex> */}
      {/* {loading ? (
        <TableLoader />
      ) : ( */}

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
      {/* <TableContainer
        border={'2px solid'}
        borderColor={cs}
        mt={5}
        borderRadius={20}
        px={10}
        py={5}
      >
        <Flex p={5} justifyContent={'space-between'}>
          <Input
            mx={5}
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
            placeholder="Find By Name"
          />
          <Select
            placeholder="Select option"
            onChange={e => setFilterRole(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="businessman">Businessman</option>
          </Select>
          <Button onClick={filterData} mx={5} px={10} colorScheme="teal">
            Filter
          </Button>
        </Flex>
        <Box height={'60vh'} overflowY={'auto'}>
          <Table colorScheme={cs}>
            <Thead>
              <Tr>
                <Th textAlign={'center'}>Index</Th>
                <Th textAlign={'center'}>Name</Th>
                <Th textAlign={'center'}>Type</Th>
                <Th textAlign={'center'}>Email</Th>
                <Th textAlign={'center'}>Contact</Th>
                <Th textAlign={'center'}>Address</Th>
                <Th textAlign={'center'}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
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
                </Tr>
              ) : (
                sampleData
                  ?.slice(page * items - items, page * items)
                  .map((user, index) => (
                    <Tr key={user._id}>
                      <Td textAlign={'center'}>{index + 1}</Td>
                      <Td textAlign={'center'}>{user?.name}</Td>
                      <Td textAlign={'center'}>{user?.role}</Td>
                      <Td textAlign={'center'}>{user?.email}</Td>
                      <Td textAlign={'center'}>{user?.contact}</Td>
                      <Td textAlign={'center'}>{`${user?.state || ""} ${user?.district || ""} ${user?.pincode || ""}`}</Td>
                      <Td textAlign={'center'}>
                        <Button
                          onClick={() => {
                            setAddUser(false);
                            setUser(user);
                            onOpen();
                          }}
                        >
                          Edit
                        </Button>
                      </Td>
                    </Tr>
                  ))
              )}
            </Tbody>
          </Table>
        </Box>
        <Flex my={5} justifyContent={'center'} alignItems={'center'}>
          <Text>PAGE: &nbsp;&nbsp;</Text>
          <NumberInput
            min={1}
            max={
              sampleData.length > items
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
      </TableContainer> */}

      {/* <Modal onClose={onClose} size={'5xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent p={5} mt={10}>
          <ModalHeader>USER DETAILS</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Box w={'50%'} p={5}>
                <FormControl mt={3} isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={user?.name}
                    onChange={e => setUser({ ...user, name: e.target.value })}
                  />
                </FormControl>
                <FormControl mt={3} isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={user?.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                  />
                </FormControl>
                <FormControl mt={3} isRequired>
                  <FormLabel>Contact</FormLabel>
                  <Input
                    type={'number'}
                    value={user?.contact}
                    onChange={e =>
                      setUser({ ...user, contact: Number(e.target.value) })
                    }
                  />
                </FormControl>
              </Box>
              <Box w={'50%'} p={5}>
                <FormControl mt={3} isRequired>
                  <FormLabel>User Role</FormLabel>
                  <Select
                    placeholder="Select option"
                    value={user?.role}
                    onChange={e => setUser({ ...user, role: e.target.value })}
                  >
                    <option value="customer">Customer</option>
                    <option value="businessman">Businessman</option>
                  </Select>
                </FormControl>

                {addUser && (
                  <FormControl mt={3} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type={'password'}
                      value={user?.password}
                      onChange={e =>
                        setUser({ ...user, password: e.target.value })
                      }
                    />
                  </FormControl>
                )}
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            {!addUser && (
              <Button colorScheme={'red'} mr={5} onClick={handleDelete}>
                Delete
              </Button>
            )}
            <Button
              colorScheme={'blue'}
              mr={5}
              onClick={
                addUser
                  ? async () => {
                    if (
                      !user?.name ||
                      !user?.email ||
                      !user?.role ||
                      !user?.password
                    ) {
                      toast({
                        title: 'Error',
                        description: 'Please fill all the fields',
                        status: 'error',
                        duration: 2000,
                        isClosable: true,
                      });
                      return;
                    }
                    console.log(user);
                    const res = await createUser(user);
                    console.log(res);
                    if (res.status === 'success') {
                      setGetData(!getData);
                      toast({
                        title: 'User Added',
                        description: 'User Added Successfully',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                        position: 'top-right',
                      });
                    } else {
                      toast({
                        title: 'User Not Added',
                        description: 'User Not Added Successfully',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                        position: 'top-right',
                      });
                    }
                    onClose();
                  }
                  : handleUpdateUser
              }
            >
              Save
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

      {/* <Divider mt={5} mb={10} /> */}
    </Box>
  );
};

export default Users;
