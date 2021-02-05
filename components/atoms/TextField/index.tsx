import {
  Button,
  Input,
  useColorModeValue,
  useStyleConfig,
} from '@chakra-ui/react';
import React from 'react';
import ITextField from './TextField';

export default function ULTextField({
  variant = 'outline',
  borderRadius = '2px',
  hasShadow = true,
  fontSize = '14px',
  props,
  ...params
}: ITextField) {
  const styles = useStyleConfig('Input', {});
  //const color = useColorModeValue('white', 'white');

  return (
    <Input
      sx={styles}
      onChange={params.onChange}
      variant={variant}
      size={params.size}
      width={params.width}
      height={params.height}
      borderRadius={borderRadius}
      css={params.css}
      borderWidth="2px"
      fontSize={fontSize}
      style={params.style}
      placeholder={params.placeholder}
      value={params.value}
      {...props}
    />
  );
}
