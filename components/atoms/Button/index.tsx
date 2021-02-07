import { Button, useColorModeValue, useStyleConfig } from '@chakra-ui/react';
import React from 'react';
import IButton, { DefaultBtn, IconBtn } from './Button';

export default function ULButton({
  title = 'Button',
  children,
  colorScheme = 'primary',
  gradientDir = 'to-t',
  variant = 'outline',
  borderRadius = '3px',
  fontSize = '20px',
  props,
  ...params
}: IButton) {
  const styles = useStyleConfig('Button', { colorScheme });
  const color = useColorModeValue('white', 'white');

  return (
    <Button
      sx={styles}
      onClick={params.onClick}
      variant={variant}
      size={params.size}
      colorScheme={colorScheme}
      rightIcon={params.rightIcon}
      leftIcon={params.leftIcon}
      isLoading={params.isLoading}
      width={params.width}
      height={params.height}
      borderRadius={borderRadius}
      loadingText={params.loadingText}
      css={params.css}
      fontSize={fontSize}
      textColor={color}
      style={params.style}
      {...props}
    >
      {children ?? title}
    </Button>
  );
}
