import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Switch,
  useColorMode,
  useTheme,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import AuthRoute from '../../backend/auth';
import useBreakPoints from '../../hooks/useBreakPoints';
import ULButton from '../atoms/Button';
import ULText from '../atoms/Text';
import ULTextField from '../atoms/TextField';
import Logo from '../icons/Logo';

export default function Header({ onSearch }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { md, sm } = useBreakPoints();
  const theme = useTheme();
  const Router = useRouter();
  const signOut = () => {
    var auth = new AuthRoute();
    auth.SignOut();
    Router.replace('/');
  };

  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: (values) => {
      onSearch(values.search);
    },
  });

  const change = (name, e) => {
    console.log(name, e);
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
    onSearch(e.target.value);
  };

  return (
    <Box
      className="header"
      w="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      px={sm ? '0' : '1rem'}
      maxW="1200px"
    >
      <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
        <Box
          w="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Logo />
          <Box display="flex" height="100%" alignItems="center">
            <Box hidden={!md} w="300px" mr={5}>
              <ULTextField
                onChange={(e) => change('search', e)}
                width="100%"
                value={formik.values.search}
                placeholder="Search"
                props={{ name: 'search' }}
              />
            </Box>
            <Menu closeOnSelect={false}>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon fontWeight="600" />}
                size="md"
                variant="solid"
                style={{
                  color: 'white',
                  background: theme.colors.primaryColor.main,
                }}
              >
                Menu
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Box
                    display="flex"
                    w="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      mr={4}
                      mb={1}
                      aria-label="light-mode-button"
                      onClick={colorMode == 'dark' ? toggleColorMode : () => {}}
                    >
                      <SunIcon opacity={colorMode == 'dark' ? 0.4 : 1} />
                    </Box>
                    <Switch
                      onChange={toggleColorMode}
                      isChecked={colorMode == 'dark'}
                      colorScheme="primary"
                    />

                    <Box
                      ml={4}
                      mb={1}
                      aria-label="dark-mode-button"
                      onClick={
                        colorMode == 'light' ? toggleColorMode : () => {}
                      }
                    >
                      <MoonIcon opacity={colorMode == 'light' ? 0.2 : 1} />
                    </Box>
                  </Box>
                </MenuItem>
                <MenuItem>
                  <Box
                    onClick={signOut}
                    display="flex"
                    w="100%"
                    height="100%"
                    justifyContent="center"
                  >
                    <ULText align="center" fontWeight="600" value="Sign out" />
                  </Box>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
        <Box hidden={md} w="100%" my={5}>
          <ULTextField
            onChange={(e) => change('search', e)}
            width="100%"
            value={formik.values.search}
            props={{ name: 'search' }}
            placeholder="Search"
          />
        </Box>
      </form>
    </Box>
  );
}
