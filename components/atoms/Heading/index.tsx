import {
  Heading,
  useColorMode,
  useColorModeValue,
  useStyleConfig,
} from '@chakra-ui/react';
import React from 'react';
import IHeading from './Heading';

export default function ULHeading({
  value = 'Text',
  props,
  ...params
}: IHeading) {
  const { colorMode } = useColorMode();
  const styles = useStyleConfig('Heading', {});

  let color;
  if (params.color === '#757575' && colorMode === 'dark') color = 'white';
  else if (params.color === 'white' && colorMode === 'light') color = '#757575';
  else color = params.color ?? useColorModeValue('#757575', 'white');

  return (
    <Heading
      size={params.size}
      fontWeight={params.fontWeight}
      variant={params.variant}
      textAlign={params.align}
      color={color}
      as={params.type}
      isTruncated={params.isTruncated}
      //sx={styles}
      {...props}
    >
      {value}
    </Heading>
  );
}
