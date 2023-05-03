import { Box, Button, Center, Image, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
  addProductImage,
  addStoreImage,
  deleteProductImage,
  deleteStoreImage,
} from '../utils/images';

const sample =
  'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=';

const ImgCard = ({ image, id, name, isVendor = false }) => {

  const [img, setImg] = useState(image);
  const [file, setFile] = useState(null);
  // console.log(image)
  return (
    <Box>
      <label>
        <Image
          borderRadius={10}
          h={'200px'}
          w={'200px'}
          src={img ? img?.fileurl : file ? URL.createObjectURL(file) : sample}
        />
        {!img && (
          <Input
            type="file"
            accept="image/*"
            onChange={e => {
              setFile(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
            hidden
          />
          )}
      </label>
      {img && (
        <Button
          w={'200px'}
          mt={2}
          colorScheme={'red'}
          onClick={async () => {
            const res = !isVendor
              ? await deleteProductImage(id, img._id, "businessItem")
              : await deleteStoreImage(id, img._id, "businessItem");
            console.log(res);
            if (res.status === 'success') {
              setImg(null);
            }
            setFile(null);
          }}
        >
          Delete
        </Button>
        )}
      {!img && (
        <Button
          onClick={async () => {
            const formData = new FormData();
            formData.append('images', file);
            formData.append('contentId', id);
            formData.append('contentName', name);
            const res = !isVendor
              ? await addProductImage(formData)
              : await addStoreImage(formData);
            console.log(res);
            if (res.status === 'success') {
              setImg(res.data.image[0]);
            }
          }}
          w={'200px'}
          mt={2}
          colorScheme={'teal'}
        >
          Add
        </Button>
        )}
    </Box>
  );
};

export default ImgCard;
