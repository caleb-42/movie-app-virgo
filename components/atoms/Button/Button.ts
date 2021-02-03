import { ButtonProps } from '@chakra-ui/react';

export default interface IButton {
  variant?: 'solid' | 'ghost' | 'outline' | 'link';
  size?: 'lg' | 'md' | 'sm' | 'xs';
  rightIcon?: React.ReactElement;
  leftIcon?: React.ReactElement;
  isLoading?: boolean;
  children?: any;
  borderRadius?: string;
  title?: string;
  colorScheme?: 'primary' | 'secondary';
  fontSize?: string;
  width?: string;
  height?: string;
  gradientDir?:
    | 'to-t'
    | 'to-r'
    | 'to-l'
    | 'to-b'
    | 'to-tr'
    | 'to-br'
    | 'to-tl'
    | 'to-bl';
  loadingText?: string;
  onClick?: (event: any) => void;
  css?: string;
  style?: React.CSSProperties;
  props?: ButtonProps;
}

export const DefaultBtn = {
  width: '7rem',
  height: '2.5rem',
  borderRadius: '20px',
  gradientDir: 'to-tr',
  colorScheme: 'secondary',
} as IButton;

export const IconBtn = {
  borderRadius: '50%',
  height: '60px',
  width: '60px',
} as IButton;
