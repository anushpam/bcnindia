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
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import TableLoader from '../components/TableLoader';
import { getJobs, createJob, deleteJob } from '../utils/jobs';

const Jobs = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [getData, setGetData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState(null);
  const [addJob, setAddJob] = useState({});
  const [addmodal, setAddModal] = useState(false);

  const cs = useColorModeValue('black', 'cyan');
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getJobs();
      setJobs(data.data.jobs);
      setLoading(false);
    };

    fetchData();
  }, [getData]);

  const handleModal = item => {
    onOpen();
    setJob(item);
    // console.log(product);
  };

  const handleAddJob = () => {
    setJob({});
    onOpen();
    setAddModal(true);
  };

  const handleDelete = async id => {
    const data = await deleteJob(id);
    if (data.status === 'success') {
      toast({
        title: 'Job Deleted',
        description: 'Job deleted successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      setGetData(!getData);
      onClose();
    } else {
      toast({
        title: 'Error',
        description: data.message || 'Something went wrong!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      onClose();
    }
  };

  const handleUpdateProduct = async () => {
    /*if (!product?.name || !product?.supplierName || !product?.type) {
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
    const res = await updateProduct(product._id, formData);
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
    }*/
  };

  const handleSubmit = async () => {
    const response = await createJob(addJob);
    if (response.status !== 'success') {
      toast({
        title: 'Error',
        description: response.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      setJobs([...jobs, response.data.job]);
      onClose();
    }
  };

  return (
    <Box p={{ base: 2, md: 2 }}>
      <Flex justifyContent={'space-between'} mx={5}>
        <Heading>Job Post</Heading>
        <Button colorScheme={'blue'} onClick={handleAddJob}>
          Add New Job
        </Button>
      </Flex>

      <TableContainer
        border={'2px solid'}
        borderColor={cs}
        borderRadius={20}
        mt={5}
        px={10}
        py={5}
      >
        <Box height={'60vh'} overflowY={'auto'}>
          <Table colorScheme={cs}>
            <Thead>
              <Tr>
                <Th textAlign={'center'}>Index</Th>
                <Th textAlign={'center'}>Role</Th>
                <Th textAlign={'center'}>Location</Th>
                <Th textAlign={'center'}>Role Detail</Th>
                <Th textAlign={'center'}>Experience</Th>
                <Th textAlign={'center'}>Time</Th>
                <Th textAlign={'center'}>Duration</Th>
                <Th textAlign={'center'}>Salary</Th>
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
                </Tr>
              )}
              {!loading &&
                jobs?.map((job, index) => (
                  <Tr>
                    <Td textAlign={'center'}>{index + 1}</Td>
                    <Td textAlign={'center'}>{job.hiringRole}</Td>
                    <Td textAlign={'center'}>{job.location}</Td>
                    <Td textAlign={'center'}>{job.roleDetails}</Td>
                    <Td textAlign={'center'}>{job.experience}</Td>
                    <Td textAlign={'center'}>{job.time}</Td>
                    <Td textAlign={'center'}>{job.duration}</Td>
                    <Td textAlign={'center'}>{job.salary}</Td>
                    <Td textAlign={'center'}>
                      <Button
                        colorScheme={'red'}
                        mr={5}
                        onClick={() => handleDelete(job._id)}
                      >
                        Delete
                      </Button>
                    </Td>
                    {/*<Td textAlign={'center'}>
                      <Button
                        onClick={() => {
                          setAddModal(false);
                          handleModal(job);
                        }}
                      >
                        Edit
                      </Button>
                      </Td>*/}
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      </TableContainer>

      <Modal onClose={onClose} size={'5xl'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent p={5} mt={10}>
          <ModalHeader>{addmodal ? 'ADD JOB' : 'JOB DETAILS'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Box w={'50%'} p={5}>
                {!addmodal && (
                  <FormControl mt={3}>
                    <FormLabel>Job Id</FormLabel>
                    <Input value={job?._id} contentEditable={false} />
                  </FormControl>
                )}
                <FormControl
                  mt={3}
                  isRequired
                  isInvalid={
                    addmodal
                      ? addJob?.hiringRole === ''
                      : job?.hiringRole === ''
                  }
                >
                  <FormLabel>Job Role</FormLabel>
                  <Input
                    value={addmodal ? addJob?.hiringRole : job?.hiringRole}
                    onChange={e => {
                      if (addmodal) {
                        setAddJob({
                          ...addJob,
                          hiringRole: e.target.value,
                        });
                      } else {
                        setJob({
                          ...job,
                          hiringRole: e.target.value,
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
                    addmodal
                      ? addJob?.roleDetails === ''
                      : job?.roleDetails === ''
                  }
                >
                  <FormLabel>Role Details</FormLabel>
                  <Input
                    value={addmodal ? addJob?.name : job?.name}
                    onChange={e => {
                      if (addmodal) {
                        setAddJob({ ...addJob, roleDetails: e.target.value });
                      } else {
                        setJob({ ...job, roleDetails: e.target.value });
                      }
                    }}
                  />
                  <FormErrorMessage>This field is required</FormErrorMessage>
                </FormControl>

                <FormControl mt={3}>
                  <FormLabel>Salary</FormLabel>
                  <Input
                    value={addmodal ? addJob?.salary : job?.salary}
                    onChange={e => {
                      if (addmodal) {
                        setAddJob({ ...addJob, salary: e.target.value });
                      } else {
                        setJob({ ...job, salary: e.target.value });
                      }
                    }}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel mt={3}>Location</FormLabel>
                  <Input
                    value={addmodal ? addJob?.location : job?.location}
                    onChange={e => {
                      if (addmodal) {
                        setAddJob({ ...addJob, location: e.target.value });
                      } else {
                        setJob({ ...job, location: e.target.value });
                      }
                    }}
                  />
                </FormControl>
              </Box>
              <Box p={5} w={'50%'}>
                <FormControl>
                  <FormLabel mt={3}>Time</FormLabel>
                  <Select
                    value={addmodal ? addJob?.time : job?.time}
                    onChange={e =>
                      addmodal
                        ? setAddJob({
                            ...addJob,
                            time: e.target.value,
                          })
                        : setJob({
                            ...job,
                            time: e.target.value,
                          })
                    }
                  >
                    <option></option>
                    {['Full Time', 'Part Time', 'Intern']?.map((c, idx) => (
                      <option value={c}>{c}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel mt={3}>Duration</FormLabel>
                  <Select
                    value={addmodal ? addJob?.duration : job?.duration}
                    onChange={e =>
                      addmodal
                        ? setAddJob({
                            ...addJob,
                            duration: e.target.value,
                          })
                        : setJob({
                            ...job,
                            duration: e.target.value,
                          })
                    }
                  >
                    <option></option>
                    {['1 Month', '3 Month', '6+ Month']?.map((c, idx) => (
                      <option value={c}>{c}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel mt={3}>Experience</FormLabel>
                  <Select
                    value={addmodal ? addJob?.experience : job?.experience}
                    onChange={e =>
                      addmodal
                        ? setAddJob({
                            ...addJob,
                            experience: e.target.value,
                          })
                        : setJob({
                            ...job,
                            experience: e.target.value,
                          })
                    }
                  >
                    <option></option>
                    {[1, 2, 5, 8, 10, 15, 20]?.map((c, idx) => (
                      <option value={c}>{c} years</option>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            {!addmodal && (
              <Button
                colorScheme={'red'}
                mr={5}
                onClick={() => handleDelete(job._id)}
              >
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
    </Box>
  );
};

export default Jobs;
