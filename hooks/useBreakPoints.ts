import { useTheme } from '@chakra-ui/react';
import { useMediaQuery } from 'react-responsive';

const useBreakPoints = (limit = 'min') => {
  const theme = useTheme();
  const key = `${limit}DeviceWidth`;
  const xs = useMediaQuery({
    [key]: theme.breakpoints['base'],
  });
  const sm = useMediaQuery({
    [key]: theme.breakpoints['sm'],
  });
  const md = useMediaQuery({
    [key]: theme.breakpoints['md'],
  });
  const lg = useMediaQuery({
    [key]: theme.breakpoints['lg'],
  });
  const xl = useMediaQuery({
    [key]: theme.breakpoints['xl'],
  });

  return { sm, md, lg, xl, xs };
};

export default useBreakPoints;
