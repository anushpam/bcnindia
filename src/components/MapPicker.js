import { Box, Flex, Input } from '@chakra-ui/react';
import React, { useState } from 'react';

import MapPicker from 'react-google-map-picker';

const DefaultLocation = { lat: 28, lng: 77 };
const DefaultZoom = 18;

const MapComponent = ({ location, setLocation }) => {
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat, lng) {
    console.log(location);
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  return (
    <Box my={5} borderRadius={10}>
      <Flex m={3} gap={3}>
        <Input value={location.lng} />
        <Input value={location.lat} />
      </Flex>
      <MapPicker
        defaultLocation={location}
        zoom={zoom}
        style={{ height: '350px' }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyAkBhTU6Tc8FNdu64ZRG4rPm2bin7H7OOI"
      />
    </Box>
  );
};

export default MapComponent;
