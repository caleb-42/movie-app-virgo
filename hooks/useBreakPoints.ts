import { useMediaQuery, useTheme } from '@chakra-ui/react';

const useBreakPoints = () => {
  const theme = useTheme();
  const [sm, md, lg, xl] = useMediaQuery([
    `(min-width: ${theme.breakpoints['sm']})`,
    `(min-width: ${theme.breakpoints['md']})`,
    `(min-width: ${theme.breakpoints['lg']})`,
    `(min-width: ${theme.breakpoints['xl']})`,
  ]);

  return { sm, md, lg, xl };
};

export default useBreakPoints;
