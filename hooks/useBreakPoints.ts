import { useTheme } from '@chakra-ui/react';
import { useMediaQuery } from 'react-responsive';

const useBreakPoints = () => {
  const theme = useTheme();
  console.log(theme.breakpoints);
  const sm = useMediaQuery({
    minDeviceWidth: theme.breakpoints['sm'],
  });
  const md = useMediaQuery({
    minDeviceWidth: theme.breakpoints['md'],
  });
  const lg = useMediaQuery({
    minDeviceWidth: theme.breakpoints['lg'],
  });
  const xl = useMediaQuery({
    minDeviceWidth: theme.breakpoints['xl'],
  });

  return { sm, md, lg, xl };
};

export default useBreakPoints;
