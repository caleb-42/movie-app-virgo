import {
  Button,
  Text,
  useColorMode,
  useColorModeValue,
  useStyleConfig,
} from '@chakra-ui/react';
import React from 'react';
import IText from './Text';

export default function ULText({ value = 'Text', props, ...params }: IText) {
  const styles = useStyleConfig('Text', {});
  const { colorMode } = useColorMode();

  let color;
  if (params.color === '#757575' && colorMode === 'dark') color = 'white';
  else if (params.color === 'white' && colorMode === 'light') color = '#757575';
  else color = params.color ?? useColorModeValue('#757575', 'white');

  return (
    <Text
      fontSize={params.fontSize}
      variant={params.variant}
      textAlign={params.align}
      color={color}
      as={params.type}
      isTruncated={params.isTruncated}
      sx={styles}
      {...props}
    >
      {value}
    </Text>
  );
}
