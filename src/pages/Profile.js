import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  FormErrorMessage,
  useToast,
  Img,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Checkbox,
} from '@chakra-ui/react';
import { ReactElement, useEffect, useState } from 'react';
import AddLicense from '../components/AddLicense';
import ImgCard from '../components/ImgCard';
import MapComponent from '../components/MapPicker';
import { getBusinessDetail, updateBusiness, updateUser } from '../utils/users';
import { getVendor } from '../utils/vendors';

export default function Profile({ userId, businessId }) {
  const addVendor = true;
  const [vendor, setVendor] = useState({});
  const [business, setBusiness] = useState({});
  const [location, setLocation] = useState({ lat: 28.6, lng: 77.2 });
  const [password, setPassword] = useState('');
  const [license, setLicense] = useState('');
  const [file, setFile] = useState(null);
  const cs = useColorModeValue('black', 'cyan');
  const toast = useToast();

  console.log(businessId);
  useEffect(() => {
    const fun = async () => {
      const res = await getVendor(userId);
      const res1 = await getBusinessDetail(businessId);
      console.log(res);
      console.log(res1);
      if (res.status && res1.status !== 'success') {
        toast({
          title: 'Error',
          description: res.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      } else {
        setVendor(res.data.user);
        setBusiness(res1.data.business);
        setLocation({
          lat: res.data.user.location?.coordinates[1],
          lng: res.data.user.location?.coordinates[0],
        });
      }
    };
    fun();
  }, []);
  // console.log(vendor);
  // console.log(business);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Heading mt={5}>Profile</Heading>
      <Container maxW={'7xl'} py={6}>
      <h1>User Detail</h1>
        <Flex  flexDir={{ base: 'column', md: 'row' }}>
          <Box  w={{ base: '100%', md: '50%' }} p={5}>
            <FormControl
              isInvalid={vendor?.name === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Name</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={vendor?.name}
                onChange={e => setVendor({ ...vendor, name: e.target.value })}
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={vendor?.email === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Email</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={vendor?.email}
                onChange={e => setVendor({ ...vendor, email: e.target.value })}
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={vendor?.contact === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Contact</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={vendor?.contact}
                onChange={e => setVendor({ ...vendor, contact: e.target.value })}
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={vendor?.address?.district === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Address (District)</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={vendor.address?.district}
                onChange={e => setVendor({ ...vendor, 'address.district': e.target.value })}
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={vendor?.address?.city === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Address (City)</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={vendor.address?.city}
                onChange={e => setVendor({ ...vendor, 'address.city': e.target.value })}
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={vendor?.address?.state === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Address (State)</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={vendor.address?.state}
                onChange={e => setVendor({ ...vendor, 'address.state': e.target.value })}
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
          </Box>
          <Box  w={{ base: '100%', md: '50%' }} p={5}>
            {/* {addVendor && ( */}
              <FormControl
                isInvalid={vendor?.pincode === ''}
                isRequired={addVendor}
                mt={3}
              >
                <FormLabel>Pin Code</FormLabel>
                <Input
                  borderColor={cs}
                  contentEditable={'false'}
                  onChange={e =>
                    setVendor({ ...vendor, 'address.pincode': e.target.value })
                  }
                  value={vendor.address?.pincode}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
            {/* )} */}
            <MapComponent
              def={vendor?.location}
              location={location}
              setLocation={setLocation}
            />
          </Box>
        </Flex>

        {/* business detail */}
        <h1>Business Detail</h1>
        <Flex flexDir={{ base: 'column', md: 'row' }}>
          <Box w={{ base: '100%', md: '50%' }} p={5}>
            <FormControl
              isInvalid={business?.userId === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Business Name</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={business?.name}
                onChange={e =>
                  setBusiness({ ...business, name: e.target.value })
                }
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={business?.userId === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Contact</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={business?.contact}
                onChange={e =>
                  setBusiness({ ...business, contact: e.target.value })
                }
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={business?.userId === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Address</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={business?.address}
                onChange={e =>
                  setBusiness({ ...business, address: e.target.value })
                }
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={business?.userId === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Type</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={business?.type}
                onChange={e =>
                  setBusiness({ ...business, type: e.target.value })
                }
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
          </Box>
          <Box w={{ base: '100%', md: '50%' }} p={5}>
            <FormControl
              isInvalid={business?.userId === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Description</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={business?.description}
                onChange={e =>
                  setBusiness({ ...business, description: e.target.value })
                }
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={business?.userId === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Email</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={business?.email}
                onChange={e =>
                  setBusiness({ ...business, email: e.target.value })
                }
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={business?.userId === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Pincode</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={business?.pincode}
                onChange={e =>
                  setBusiness({ ...business, pincode: e.target.value })
                }
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={business?.userId === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Website</FormLabel>
              <Input
                contentEditable={'false'}
                borderColor={cs}
                value={business?.website}
                onChange={e =>
                  setBusiness({ ...business, website: e.target.value })
                }
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
          </Box>
        </Flex>

        <Flex justifyContent={'center'}>
          <Button
            onClick={async () => {
              console.log(location);
              const res = await updateUser(vendor?._id, {
                name: vendor?.name,
                role: 'businessman',
                // email: vendor?.email,
                contact: vendor?.contact,
                'address.city': vendor?.city,
                'address.district': vendor?.district,
                'address.state': vendor?.state,
                'address.pincode': vendor?.pincode,
                'location.coordinates': [125, 25],
              });
              const res1 = await updateBusiness(businessId, {
                 name:business?.name,
                 email:business?.email,
                 contact:business?.contact,
                 'location.coordinates': [77,28],
                 type: business?.type,
                 website: business?.website,
                 address: business?.address,
                 owner: vendor?._id
              });
              if (res.status && res1.status === 'success') {
                console.log(res);
                console.log(res1);
                toast({
                  title: 'User and Business Details Updated Successfully',
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: 'Error Updating Details',
                  status: 'error',
                  duration: 2000,
                  isClosable: true,
                });
              }
            }}
            colorScheme={'teal'}
            px={7}
            m={5}
          >
            Save
          </Button>
        </Flex>

        <Flex gap={5} justifyContent={'center'} flexWrap={'wrap'}>
          {business?.images?.map(img => (
            <ImgCard image={img} id={business?._id} name={"business"} />
          ))}
          {[...Array(5 - (business?.images ? business?.images?.length : 0))].map(
            (_, i) => (
              <ImgCard id={business?._id} name={"business"} />
            )
          )}
        </Flex>

      </Container>

      {/* <Container maxW={'7xl'}>
             </Container> */}

      {/* <Container maxW={'7xl'} py={6}>
        <Flex flexDir={{ base: 'column', md: 'row' }}>
          <Box w={{ base: '100%', md: '50%' }} p={5}>
            {addVendor && (
              <FormControl
                isInvalid={vendor?.userId === ''}
                isRequired={addVendor}
                mt={3}
              >
                <FormLabel>Vendor ID</FormLabel>
                <Input
                  contentEditable={'false'}
                  borderColor={cs}
                  value={vendor?.vendorId?._id}
                  onChange={e =>
                    setVendor({ ...vendor, userId: e.target.value })
                  }
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
            )}
            {addVendor && (
              <FormControl mt={3}>
                <FormLabel>Store ID</FormLabel>
                <Input
                  borderColor={cs}
                  contentEditable={'false'}
                  value={vendor?._id}
                />
              </FormControl>
            )}

            <FormControl
              mt={3}
              isInvalid={vendor?.name === ''}
              isRequired={addVendor}
            >
              <FormLabel>Store Name</FormLabel>
              <Input
                required={true}
                borderColor={cs}
                onChange={e => setVendor({ ...vendor, name: e.target.value })}
                value={vendor?.name}
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>

            <FormControl mt={3}>
              <FormLabel>Store Owner/Manager Contact</FormLabel>
              <Input
                borderColor={cs}
                onChange={e =>
                  setVendor({ ...vendor, contact: e.target.value })
                }
                value={vendor?.contact}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Store Drug License No</FormLabel>
              <Input
                borderColor={cs}
                onChange={e =>
                  setVendor({ ...vendor, license: e.target.value })
                }
                value={vendor?.license}
              />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Email</FormLabel>
              <Input
                borderColor={cs}
                onChange={e => setVendor({ ...vendor, email: e.target.value })}
                value={vendor?.email}
              />
            </FormControl>

            <FormControl
              isInvalid={vendor?.address === ''}
              isRequired={addVendor}
              mt={3}
            >
              <FormLabel>Store Address</FormLabel>
              <Textarea
                borderColor={cs}
                onChange={e =>
                  setVendor({ ...vendor, address: e.target.value })
                }
                value={vendor?.address}
              />
              <FormErrorMessage>This field is required</FormErrorMessage>
            </FormControl>
            {!addVendor && (
              <FormControl mt={3}>
                <FormLabel>Pin Code</FormLabel>
                <Input
                  borderColor={cs}
                  onChange={e =>
                    setVendor({ ...vendor, pincode: e.target.value })
                  }
                  value={vendor?.pincode}
                />
              </FormControl>
            )}
          </Box>
          <Box w={{ base: '100%', md: '50%' }} p={5}>
            {addVendor && (
              <FormControl
                isInvalid={vendor?.pincode === ''}
                isRequired={addVendor}
                mt={3}
              >
                <FormLabel>Pin Code</FormLabel>
                <Input
                  borderColor={cs}
                  onChange={e =>
                    setVendor({ ...vendor, pincode: e.target.value })
                  }
                  value={vendor?.pincode}
                />
                <FormErrorMessage>This field is required</FormErrorMessage>
              </FormControl>
            )}
            <MapComponent
              def={vendor?.location}
              location={location}
              setLocation={setLocation}
            />
            <FormControl display={'flex'} alignItems={'center'} gap={5} mt={3}>
              <FormLabel m={0}>Store Active</FormLabel>
              <Checkbox
                borderColor={cs}
                isChecked={!vendor?.disabled}
                onChange={() => {
                  setVendor({ ...vendor, disabled: !vendor?.disabled });
                }}
              />
            </FormControl>
            {!addVendor && (
              <Flex h={'30%'} mb={5} justifyContent={'space-between'}>
                <Carousel />
                <ImageSlider />
              </Flex>
            )}
            {!addVendor && (
              <iframe
                style={{ 'border-radius': '20px' }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1292876304187!2d77.37299481504431!3d28.62588699113279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5e08f702bc1%3A0x1805a28b0e6cb9b3!2sHouse%20Of%20Bottles!5e0!3m2!1sen!2sin!4v1653627838499!5m2!1sen!2sin"
                width="100%"
                height="65%"
              ></iframe>
            )}
          </Box>
        </Flex>

        <Flex justifyContent={'center'}>
          <Button
            onClick={async () => {
              // console.log(location);
              const res = await updateVendor(vendor?._id, {
                name: vendor?.name,
                license: vendor?.license,
                address: vendor?.address,
                locationUrl: vendor?.locationUrl,
                pincode: vendor?.pincode,
                email: vendor?.email,
                'location.coordinates': [location?.lng, location?.lat],
                disabled: vendor?.disabled,
              });
              if (res.status === 'success') {
                console.log(res);
                toast({
                  title: 'Vendor Updated Successfully',
                  status: 'success',
                  duration: 2000,
                  isClosable: true,
                });
              } else {
                toast({
                  title: 'Error Updating Vendor',
                  status: 'error',
                  duration: 2000,
                  isClosable: true,
                });
              }
            }}
            colorScheme={'teal'}
            px={7}
            m={5}
          >
            Save
          </Button>
          <Button colorScheme={'red'} onClick={onOpen} px={7} m={5}>
            Disable Store
          </Button>
          <AddLicense id={vendor?._id} doc={vendor?.licenseDoc} />
        </Flex>
        <Flex gap={5} justifyContent={'center'} flexWrap={'wrap'}>
          {vendor?.images?.map(img => (
            <ImgCard image={img} id={vendor?._id} />
          ))}
          {[...Array(5 - (vendor?.images ? vendor?.images?.length : 0))].map(
            (_, i) => (
              <ImgCard id={vendor?._id} />
            )
          )}
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent p={5} mt={10}>
            <ModalHeader>DISABLE STORE</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  borderColor={cs}
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={async () => {
                  // const res = await disableVendor(vendor?._id, password);
                  console.log(res);
                  if (res.status === 'success') {
                    toast({
                      title: `Vendor ${
                        vendor?.disabled ? 'Enabled' : 'Disabled'
                      } Successfully`,
                      status: 'success',
                      duration: 2000,
                      isClosable: true,
                    });
                  } else {
                    toast({
                      title: `Error ${
                        vendor?.disabled ? 'Enabling' : 'Disabling'
                      } Vendor`,
                      status: 'error',
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                  onClose();
                }}
              >
                {vendor?.disabled ? 'Enable' : 'Disable'}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container> */}
    </Box>
  );
}
