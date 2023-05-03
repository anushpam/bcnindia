import React from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  Button,
  Image,
} from '@chakra-ui/react';
import {
  FiUser,
  FiPocket,
  FiStar,
  FiMenu,
  FiChevronDown,
  FiHelpCircle,
  FiEdit,
} from 'react-icons/fi';
import { FaDonate } from 'react-icons/fa';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const LinkItems = [
  { name: 'Profile', icon: FiUser, path: '/' },
  { name: 'Businesses/Products', icon: FiPocket, path: '/businesses' },
  { name: 'Job Post', icon: FiStar, path: '/jobs' },
  { name: 'Referrels', icon: FiStar, path: '/referrels' },
  { name: 'Help', icon: FiHelpCircle, path: '/help' },
];

export default function SidebarWithHeader({ children, setAdmin }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} setAdmin={setAdmin} />
      <Box ml={{ base: 0, md: 80 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      //   transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 80 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        mb={10}
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      >
  
        <Image
          // size={'sm'}
          // boxSize='sm'
          // objectFit='cover'
          style={{"height":"100px"}}
          src={ '/bcn-logo.png'}
          alt="logo"
        />
        {/* <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          BCN Business
        </Text> */}
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem
          key={link.name}
          icon={link.icon}
          path={link.path}
          onClick={onClose}
          //   transition="3s ease"
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, path, children, ...rest }) => {
  return (
    <Link to={path}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#FC4C02',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ setAdmin, onOpen, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Image
          // size={'sm'}
          // boxSize='sm'
          // objectFit='cover'
          style={{"height":"80px"}}
          src={ '/bcn-logo.png'}
          alt="logo"
        />
      </Text>

      <HStack spacing={{ base: '6', md: '6' }}>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">BUSINESS</Text>
                  {/* <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text> */}
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem onClick={() => setAdmin(null)}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
