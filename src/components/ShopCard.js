import {
  Box,
  Button,
  Heading,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

const ShopCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      m={5}
      _hover={{
        // transform: 'scale(1.05)',
        boxShadow: 'lg',
        border: '2px solid red',
        cursor: 'pointer',
      }}
      border={'2px solid white'}
      p={10}
      borderRadius={10}
    >
      <Heading>Royal Wine Shop</Heading>
      <Text mt={5}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat aperiam
        at libero culpa cumque praesentium nesciunt officia tenetur dolorum
        nostrum.
      </Text>
    </Box>
  );
};

export default ShopCard;
