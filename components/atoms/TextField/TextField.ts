import { InputProps } from '@chakra-ui/react';

export default interface ITextField {
  variant?: 'solid' | 'flushed' | 'outline' | 'unstyled';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  borderRadius?: string;
  placeholder?: string;
  value?: string;
  fontSize?: string;
  hasShadow?: boolean;
  width?: string;
  height?: string;
  onChange?: (event: any) => void;
  css?: string;
  style?: React.CSSProperties;
  props?: InputProps;
}
