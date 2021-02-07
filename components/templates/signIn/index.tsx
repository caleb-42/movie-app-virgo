import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Icon,
  IconButton,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import AuthRoute from '../../../backend/auth';
import useToaster from '../../../hooks/useToaster';
import assts from '../../../utils/assets';
import ULButton from '../../atoms/Button';
import ULHeading from '../../atoms/Heading';
import ULText from '../../atoms/Text';
import ULTextField from '../../atoms/TextField';
import Logo from '../../icons/Logo';
import { SiginStyle } from './style';

export default function SignIn() {
  const { toaster } = useToaster();
  const [isLoading, setLoading] = React.useState(false);
  React.useEffect(() => {
    AuthRoute.win = window;
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    }),
    onSubmit: (values) => {
      verifyEmail(values.email);
    },
  });

  const change = (name, e) => {
    console.log(name, e);
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };

  const verifyEmail = async (email) => {
    const auth = new AuthRoute();
    setLoading(true);
    try {
      await auth.sendSignInLink(email);
      toaster({ message: 'Login link has been sent to your email' });
    } catch (e) {
      toaster({ status: 'error', message: 'Something went wrong. Try again' });
    }
    setLoading(false);
  };

  console.log(formik.values);

  return (
    <SiginStyle>
      <Box className="header" w="100%">
        <Logo />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        flexGrow={1}
        w="100%"
      >
        <Box w="100%" mb="10rem">
          <Box className="signin-body" mx="auto" maxW="1200px" w="100%">
            <Box
              className="volgi-in-head-left"
              justifyContent="center"
              alignItems="center"
              flexDir="column"
            >
              <ULHeading
                size="lg"
                type="h1"
                align="center"
                props={{ mb: '.5rem', w: '100%' }}
                value="Volgi"
              />
              <Box p="1" mx="auto" className="movies">
                <ULText color="#fff" value="MOVIES" />
              </Box>
            </Box>
            <Box w="100%" h="50%" className="form-con" flexDir="column">
              <Box className="sign-in-head" display="none">
                <ULHeading
                  size="sm"
                  type="h1"
                  align="center"
                  props={{ mb: '.5rem', w: '100%' }}
                  value="Sign In"
                />
              </Box>
              <Box
                className="volgi-in-head"
                w="100%"
                display="flex"
                alignItems="center"
                flexDir="column"
              >
                <ULHeading
                  size="lg"
                  type="h1"
                  align="center"
                  props={{ mb: '.5rem', w: '100%' }}
                  value="Volgi"
                />
                <Box p="1" className="movies">
                  <ULText color="#fff" value="MOVIES" />
                </Box>
              </Box>

              <Box
                m={3}
                alignItems="center"
                justifyContent="space-between"
                w="100%"
                flexDir="column"
                display="flex"
              >
                <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
                  <Box mt="2rem" mb="1rem" height="80px" w="100%">
                    <Box mb={1}>
                      <ULTextField
                        onChange={(e) => change('email', e)}
                        props={{ textAlign: 'center', name: 'email' }}
                        width="100%"
                      />
                    </Box>
                    {formik.touched.email && Boolean(formik.errors.email) && (
                      <ULText
                        fontSize="13px"
                        fontWeight="600"
                        color="red"
                        value={formik.errors.email}
                      />
                    )}
                  </Box>
                  <ULButton
                    isLoading={isLoading}
                    width="100%"
                    props={{ type: 'submit' }}
                  >
                    Send link
                  </ULButton>
                </form>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </SiginStyle>
  );
}
