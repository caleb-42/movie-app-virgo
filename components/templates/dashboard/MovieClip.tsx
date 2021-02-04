import { Box } from '@chakra-ui/react';
import useBreakPoints from '../../../hooks/useBreakPoints';

export default function MovieClip({ movie, index = 0 }) {
  const { sm } = useBreakPoints();

  return (
    <Box
      borderRadius={sm ? '20px' : '0'}
      key={index}
      bg={`#${index}f${index}33${index}f${index}`}
      h={sm ? '300px' : '330px'}
    />
  );
}
