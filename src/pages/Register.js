import {
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  FormErrorMessage,
  useToast,
  Button,
  Center,
} from '@chakra-ui/react';

import { useState } from 'react';
import { registerUser as registeruser } from '../utils/auth';

export default function RegisterForm() {
  const valid = true;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [pwd, setPwd] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [type, setType] = useState('');
  const [code, setCode] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState();

  const toast = useToast();
  const bg = useColorModeValue('gray.50', 'gray.800');
  const bg2 = useColorModeValue('white', 'gray.700');

  const registerUser = async () => {
    const res = await registeruser(
      name,
      email,
      pwd,
      businessName,
      type,
      pincode,
      address,
      code,
      contact,
    );
    if (res.status === 'success') {
      toast({
        title: 'Success',
        description: 'Registered successfully',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setName('');
      setEmail('');
      setContact('');
      setPwd('');
      setBusinessName('');
      setType('');
      setPincode('');
      setAddress('');
      setCode('');
    } else {
      toast({
        title: 'Error',
        description: res.message || 'Error registering User',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  return (
    <Flex minH={'100vh'} bg={bg}>
      <Stack spacing={8} mx={'auto'} maxW={'5xl'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign="center">
            Register Business
          </Heading>
        </Stack>
        <Box rounded={'lg'} bg={bg2} boxShadow={'lg'} p={8}>
          <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            justify={'center'}
            align={'center'}
            gap={5}
          >
            <Flex gap={5} flexDir={'row'}>
              <FormControl isRequired={valid}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  placeholder="Name"
                  value={name}
                  // onChange={e => setName(e.target.value)}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <FormErrorMessage>Name is required</FormErrorMessage>
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <FormErrorMessage>Email is required</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex gap={5} flexDir={'row'}>
              <FormControl>
                <FormLabel htmlFor="referrel_code">Referrel Code</FormLabel>
                <Input
                  id="referrel_code"
                  type="text"
                  placeholder="Referrel Code"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  required
                />
                <FormErrorMessage>Referrel Code is required</FormErrorMessage>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={pwd}
                  onChange={e => setPwd(e.target.value)}
                  required
                />
                <FormErrorMessage>Password is required</FormErrorMessage>
              </FormControl>
            </Flex>
          </Flex>

          <h1
            style={{ textAlign: 'left', fontSize: '20px', padding: '20px 0' }}
          >
            Business Details
          </h1>
          <Flex gap={5} flexDir={'row'}>
            <FormControl isRequired>
              <FormLabel htmlFor="businessName">Business Name</FormLabel>
              <Input
                id="businessName"
                placeholder="Business Name"
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                required
              />
              <FormErrorMessage>Business Name is required</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="businessName">Business Contact</FormLabel>
              <Input
                id="businessContact"
                placeholder="Business Contact"
                value={contact}
                onChange={e => setContact(e.target.value)}
                type={'number'}
                min={1111111111}
                max={9999999999}
                required
              />
              <FormErrorMessage>Business Contact is required</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="address">Address</FormLabel>
              <Input
                id="address"
                type="text"
                placeholder="Address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
              />
              <FormErrorMessage>Address is required</FormErrorMessage>
            </FormControl>
          </Flex>
          <Flex gap={5} flexDir={'row'}>
            <FormControl isRequired>
              <FormLabel htmlFor="pincode">Pincode</FormLabel>
              <Input
                id="pincode"
                placeholder="Pincode"
                type="number"
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                required
              />
              <FormErrorMessage>Pincode is required</FormErrorMessage>
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="type">Type</FormLabel>
              <Select placeholder="" onChange={e => setType(e.target.value)}>
                <option value="service">Service</option>
                <option value="product">Product</option>
              </Select>

              <FormErrorMessage>Type is required</FormErrorMessage>
            </FormControl>
          </Flex>
          <Center my={5}>
            <Button type="submit" onClick={() => registerUser()}>
              Register Business
            </Button>
          </Center>
        </Box>
      </Stack>
    </Flex>
  );
}
