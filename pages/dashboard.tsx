import { Box, Button, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import AuthRoute from '../backend/auth';
import ULButton from '../components/atoms/Button';
import ULHeading from '../components/atoms/Heading';
import ULText from '../components/atoms/Text';
import PrivateRoute from '../utils/privateRoute';

function Dashboard({ user }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const Router = useRouter();

  React.useEffect(() => {
    console.log(user);
    AuthRoute.win = window;
  }, []);

  const signOut = () => {
    var auth = new AuthRoute();
    auth.SignOut();
    Router.replace('/');
  };

  return (
    <Box
      display="flex"
      height="100%"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
    >
      <ULHeading props={{ mb: '2rem' }} value="Welcome" />
      <ULButton
        onClick={toggleColorMode}
        colorScheme={colorMode == 'light' ? 'secondary' : 'primary'}
      >
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </ULButton>
      <Box m={3}>
        <ULButton onClick={signOut}>Signout</ULButton>
      </Box>
      <Box w="500px" m={3}>
        <ULText value="A lot happened this year. Lots of sad tales. To be honest, it’s a bit difficult to write a review about this year without being overwhelmed with all that happened. Regardless, I’m going to keep my personal sad tales out of this review and focus on how my year in tech went as I’ve always done." />
      </Box>
    </Box>
  );
}

export default function DashboardComp() {
  return <PrivateRoute Component={Dashboard} />;
}
