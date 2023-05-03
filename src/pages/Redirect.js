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

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { validate } from '../utils/auth';

export default function Redirect({ setAdmin }) {
  const [getData, setGetData] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [sampleData, setSampleData] = useState({"name":"", "email":"", "password":"" });
  const params = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const bg = useColorModeValue('gray.50', 'gray.800');
  const bg2 = useColorModeValue('white', 'gray.700');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await validate(params.token);

      if (res.status === 'authorized' && res.data.user.role === 'businessman') {
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
      setLoading(false);
    };

    fetchData();
  }, [getData]);

  return (
    <Flex minH={'100vh'} bg={bg}>
      <Stack spacing={8} mx={'auto'} maxW={'5xl'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign="center">
            Please Wait Validating ....
          </Heading>
        </Stack>
      </Stack>
    </Flex>
  );
}
