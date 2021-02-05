/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable require-jsdoc */
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../utils/app.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
