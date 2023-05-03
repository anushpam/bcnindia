import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { login } from '../utils/auth';

export default function SimpleCard({ setAdmin }) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
 
  const toast = useToast();

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign into BCN Business</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={pwd}
                onChange={e => setPwd(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={async () => {
                  const res = await login(email, pwd);
                  if (res.status === 'authorized') {
                    setAdmin(res.data);
                    toast({
                      title: 'Success',
                      description: 'You are now logged in',
                      status: 'success',
                      duration: 2000,
                      isClosable: true,
                      position: 'top-right',
                    });
                  } else {
                    toast({
                      title: 'Login Failed',
                      description: res.message,
                      status: 'error',
                      duration: 2000,
                      isClosable: true,
                      position: 'top-right',
                    });
                  }
                }}
              >
                Sign in
              </Button>
              <Link color={'blue.400'} href={"/registration-form"} >New Business? Register</Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
