import { CloseIcon } from '@chakra-ui/icons';
import { Box, useMediaQuery, useTheme, useToast } from '@chakra-ui/react';
import ULText from '../components/atoms/Text';

const useToaster = () => {
  const toast = useToast();
  let toastId;
  const toaster = ({ status = 'success', message = '' }) => {
    toastId = toast({
      position: 'top-right',
      render: () => (
        <Box color="white" display="flex">
          <Box
            bg={status == 'error' ? 'red.600' : '#6cb93e'}
            p={3}
            onClick={() => toast.close(toastId)}
          >
            <ULText fontSize="14px" fontWeight="600" value={message} />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="50px"
            bg={status == 'error' ? 'red.900' : 'teal.900'}
            aria-label="close-toast"
            onClick={() => toast.close(toastId)}
            cursor="pointer"
          >
            <CloseIcon color="white" w={3} h={3} />
          </Box>
        </Box>
      ),
      duration: 5000,
      isClosable: true,
    });
  };

  return { toaster };
};

export default useToaster;
