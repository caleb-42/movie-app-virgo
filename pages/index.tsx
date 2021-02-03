import { Box, Button, useColorMode } from '@chakra-ui/react';
import React from 'react';
import AuthRoute from '../backend/auth';
import ULButton from '../components/atoms/Button';
import ULHeading from '../components/atoms/Heading';
import ULText from '../components/atoms/Text';
import ULTextField from '../components/atoms/TextField';

export default function Home() {
  React.useEffect(() => {
    AuthRoute.win = window;
  }, []);

  const verifyEmail = async (email) => {
    const auth = new AuthRoute();
    await auth.sendSignInLink(email);
  };

  return (
    <Box
      display="flex"
      height="100%"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <ULHeading props={{ mb: '2rem' }} value="Auth" />

      <Box m={3}>
        <ULButton onClick={() => verifyEmail('babaewisco@gmail.com')}>
          email
        </ULButton>
      </Box>
    </Box>
  );
}
