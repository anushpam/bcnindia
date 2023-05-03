import {
  Button,
  Center,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Toast,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
// import { addLicense } from '../utils/images';
// import PDFViewer from 'pdf-viewer-reactjs';
import { Document, Page } from 'react-pdf';

const AddLicense = ({ id, doc }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [license, setLicense] = useState(null);
  const toast = useToast();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Center p={5}>
      <Button colorScheme={'blue'} onClick={onOpen}>
        License
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size={'6xl'}>
        <ModalOverlay />
        <ModalContent p={5} mt={10}>
          <ModalHeader>Images</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Center>
              <PDFViewer
                document={{
                  url: doc?.fileurl,
                }}
                hideRotation
                hideZoom
                hideNavbar
              />
            </Center> */}
            {/* <Center d={'flex'} flexDir={'column'}>
              <Document
                file={doc?.fileurl}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </Center> */}
            <FormControl>
              <FormLabel>License Document</FormLabel>
              <Input
                type="file"
                accept="application/pdf"
                onChange={e => setLicense(e.target.files[0])}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {doc?.fileurl && (
              <Button onClick={() => window.open(doc?.fileurl)} mr={3}>
                Download License
              </Button>
            )}
            <Button
              onClick={async () => {
                const formData = new FormData();
                formData.append('pdf', license);
                // const res = await addLicense(id, formData);
                const res = { status: 'null' };
                console.log(res);
                if (res.status === 'success') {
                  toast({
                    title: 'License Uploaded',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  });
                } else {
                  toast({
                    title: 'License Upload Failed',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  });
                }

                onClose();
              }}
            >
              Upload Document
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default AddLicense;
