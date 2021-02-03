import { css } from '@emotion/react';

export default {
  // The styles all button have in common
  baseStyle: (props) => {
    let color =
      props.colorMode == 'dark'
        ? props.theme.colors.primary[400]
        : props.theme.colors.primary[500];
    return {
      '&': css`
        font-weight: bold;
        color: ${color};
        background: transparent;
        border: 1px solid ${color};
        transition: 0.2s ease;
      `,
      '&:hover': css`
        background: ${color} !important;
        color: white;
      `,
    };
  },
  colorSchemes: {
    primary: 'primary',
    secondary: 'secondary',
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
    colorScheme: 'primary',
  },
};
