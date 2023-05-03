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
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  FormErrorMessage,
  Checkbox,
  Select,
} from '@chakra-ui/react';
import TableLoader from '../components/TableLoader';

import { getTickets, addTicket, updateTicket } from '../utils/help';

const Help = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getData, setGetData] = useState(false);
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(20);
  const cs = useColorModeValue('black', 'cyan');
  const [sampleData, setSampleData] = useState([]);
  const [addRole, setAddRole] = useState(false);

  // message, time and status

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getTickets();
      console.log(data);
      setSampleData(data.data.tickets);
      setLoading(false);
    };

    fetchData();
  }, [getData]);

  //   useEffect(() => {
  //     const fetch = async () => {
  //       const res = await getFilteredUsers(uname, "businessman");
  //       setUserList(res.data.users);
  //     };
  //     fetch();
  //   }, [uname]);

  const toast = useToast();

  return (
    <Box p={{ base: 2, md: 2 }}>
      {/**Header*/}
      <Flex justifyContent={'space-between'} mx={5}>
        <Heading>HELP</Heading>
        <Button
          colorScheme={'blue'}
          onClick={() => {
            setAddRole(true);
            setTicket({});
            onOpen();
          }}
        >
          New Help Request
        </Button>
      </Flex>

      {/*Businesses Details Table*/}
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
                <Th textAlign={'center'}>Message</Th>
                <Th textAlign={'center'}>Time</Th>
                <Th textAlign={'center'}>Status</Th>
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
              </Tr>
            )}
            <Tbody>
              {!loading &&
                sampleData
                  ?.slice(page * items - items, page * items)
                  ?.map((item, index) => (
                    <Tr>
                      <Td textAlign={'center'}>{index + 1}</Td>
                      <Td textAlign={'center'}>{item?.message}</Td>
                      {/*action */}
                      {/* {console.log(item)} */}
                      <Td textAlign={'center'}>{item?.createdAt}</Td>
                      <Td textAlign={'center'}>
                        <Checkbox isChecked={item?.active} />
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
        { addRole &&(
          <ModalHeader>ADD HELP REQUEST</ModalHeader>
        )}
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Box w={'50%'} p={5}>
                <FormControl
                  mt={3}
                  isInvalid={ticket?.message === ''}
                  isRequired={addRole}
                >
                  <FormLabel>Message</FormLabel>
                  <Input
                    // required={true}
                    borderColor={cs}
                    onChange={e => setTicket({ ...ticket, message: e.target.value })}
                    value={ticket?.message}
                  />
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={
                  async () => {
                      if (!ticket.message) {
                        toast({
                          title: 'Please fill all the fields',
                          status: 'error',
                          duration: 9000,
                          isClosable: true,
                        });
                        return;
                      }
                      const formData = {
                        message: ticket?.message,
                      };
                      const res = await addTicket(formData);
                      console.log(res);
                      if (res.status === 'success') {
                        toast({
                          title: 'Help Created Successfully',
                          status: 'success',
                          duration: 5000,
                          isClosable: true,
                        });
                        setGetData(!getData);
                      } else {
                        toast({
                          title: res.message || 'Error in creating Help',
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
    </Box>
  );
};

export default Help;
