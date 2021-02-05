import { TextProps } from '@chakra-ui/react';

export default interface ITypography {
  value?: string;
  variant?: string;
  color?: string;
  fontWeight?: string;
  isTruncated?: boolean;
  fontSize?: string;
  align?: 'center' | 'left' | 'right' | 'justify';
  css?: string;
  style?: React.CSSProperties;
  props?: TextProps;
  type?:
    | 'i'
    | 'u'
    | 'abbr'
    | 'cite'
    | 'del'
    | 'em'
    | 'ins'
    | 'kbd'
    | 'mark'
    | 's'
    | 'samp'
    | 'sub'
    | 'sup';
}
