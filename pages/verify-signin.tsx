import { Box, Button, Spinner, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import AuthRoute from '../backend/auth';
import { css } from '@emotion/react';
import PublicRoute from '../utils/publicRoute';

export default function VerifySignin() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [email, saveEmail] = React.useState('');
  const Router = useRouter();

  React.useEffect(() => {
    AuthRoute.win = window;
    const auth = new AuthRoute();
    let email = window.localStorage.getItem('emailForSignIn');
    auth.currentUser().then(
      (res) => {
        Router.replace('/dashboard');
      },
      (err) => {
        auth.signInWithLink(email).then(
          (res) => Router.replace('/dashboard'),
          (err) => Router.replace('/')
        );
      }
    );
  }, []);

  return (
    <Box
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Spinner size="xl" />
    </Box>
  );
}
