import { Avatar } from '@chakra-ui/react';
import React from 'react';

const Profile = ({ url }) => {
  return <Avatar src={url} size={'xl'} />;
};

export default Profile;
