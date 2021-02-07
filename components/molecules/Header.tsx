import { HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons';
import lodash from 'lodash';
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
import Helper from '../../utils';

export default function Header({ onSearch, promptSearch = false }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { md, sm } = useBreakPoints();
  const theme = useTheme();
  const Router = useRouter();
  const {
    query: { q },
    asPath,
    basePath,
    pathname,
  } = Router;
  console.log(basePath, pathname, asPath);
  const updateQuery = (newQuery) => {
    if (newQuery !== undefined && pathname === '/dashboard')
      Router.push({
        pathname: '/dashboard',
        query: newQuery,
      });
  };

  const signOut = () => {
    var auth = new AuthRoute();
    auth.SignOut();
    Router.replace('/');
  };

  const formik = useFormik({
    initialValues: {
      search: decodeURI(q as string),
    },
    onSubmit: (values) => {
      onSearch(values.search);
    },
  });
  const debounceSearch = React.useMemo(
    () =>
      lodash.throttle((val) => {
        onSearch(val);
        updateQuery(val ? { q: encodeURI(val) } : null);
      }, 3000),
    []
  );
  const change = (name, e) => {
    console.log(name, e);
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
    debounceSearch(e.target.value);
  };

  React.useEffect(() => {
    if (q) onSearch(decodeURI(q as string));
    else {
      onSearch('');
      change('search', Helper.fakeEvent('search', ''));
    }
  }, [q]);

  return (
    <Box
      className="header"
      w="100%"
      pos="relative"
      zIndex="20"
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
          <Logo navigate={() => Router.push('/dashboard')} />
          <Box display="flex" height="100%" alignItems="center">
            <Box hidden={!md || promptSearch} w="300px" mr={5}>
              <ULTextField
                onChange={(e) => change('search', e)}
                width="100%"
                value={formik.values.search}
                placeholder="Search"
                props={{ name: 'search' }}
              />
            </Box>
            <Box
              hidden={!promptSearch}
              mr="1.5rem"
              onClick={() => Router.push('/dashboard')}
            >
              <SearchIcon width="1.5rem" height="1.5rem" />
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
        <Box hidden={md || promptSearch} w="100%" my={5}>
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
