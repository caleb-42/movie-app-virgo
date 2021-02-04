import { Box, Button, useColorMode } from '@chakra-ui/react';
import React from 'react';
import AuthRoute from '../backend/auth';
import ULButton from '../components/atoms/Button';
import ULHeading from '../components/atoms/Heading';
import ULText from '../components/atoms/Text';
import ULTextField from '../components/atoms/TextField';
import SignIn from '../components/templates/signIn';
import PublicRoute from '../utils/publicRoute';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  React.useEffect(() => {
    AuthRoute.win = window;
  }, []);

  const verifyEmail = async (email) => {
    const auth = new AuthRoute();
    await auth.sendSignInLink(email);
  };

  return <PublicRoute Component={() => <SignIn />} />;
}
