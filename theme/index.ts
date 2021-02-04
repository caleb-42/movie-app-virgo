// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import colors from './foundations/colors';
import Button from './components/button';
import Heading from './components/heading';
import Input from './components/input';
import { global } from './styles';

export default extendTheme({
  fonts: {
    body: "'Quicksand', sans-serif",
    heading: "'Quicksand', sans-serif",
  },
  styles: {
    global,
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors,
  components: {
    Button,
    Input,
    Heading,
  },
});
