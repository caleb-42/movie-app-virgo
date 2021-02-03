import { Box } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import AuthRoute from '../backend/auth';

export default function PrivateRoute({ Component }) {
  const Router = useRouter();
  const [validAuth, setValidAuth] = React.useState(null);
  React.useEffect(() => {
    AuthRoute.win = window;
    const auth = new AuthRoute();
    auth.currentUser().then(
      (res) => setValidAuth(res),
      (err) => {
        auth.SignOut();
        Router.replace('/');
      }
    );
  }, []);

  return validAuth ? <Component user={validAuth} /> : <Box />;
}
