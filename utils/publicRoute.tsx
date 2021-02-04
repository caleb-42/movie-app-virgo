import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import AuthRoute from '../backend/auth';

export default function PublicRoute({ Component }) {
  const Router = useRouter();
  const [validAuth, setValidAuth] = React.useState({});
  React.useEffect(() => {
    AuthRoute.win = window;
    const auth = new AuthRoute();
    auth.currentUser().then(
      (res) => {
        console.log(res);
        setValidAuth(res);
        Router.replace('/dashboard');
      },
      (err) => {
        setValidAuth(null);
        Router.replace('/');
      }
    );
  }, []);

  return !validAuth ? (
    <Component user={validAuth} />
  ) : (
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
