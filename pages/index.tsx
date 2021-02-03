import { Box, Button, useColorMode } from '@chakra-ui/react';
import React from 'react';
import ULButton from '../components/atoms/Button';
import ULHeading from '../components/atoms/Heading';
import ULText from '../components/atoms/Text';
import ULTextField from '../components/atoms/TextField';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
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
        <ULTextField />
      </Box>
      <Box w="500px" m={3}>
        <ULText value="A lot happened this year. Lots of sad tales. To be honest, it’s a bit difficult to write a review about this year without being overwhelmed with all that happened. Regardless, I’m going to keep my personal sad tales out of this review and focus on how my year in tech went as I’ve always done." />
      </Box>
    </Box>
  );
}
