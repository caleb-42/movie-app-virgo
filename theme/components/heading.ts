import { css } from '@emotion/react';

export default {
  // The styles all button have in common
  baseStyle: (props) => {
    return {};
  },
  sizes: {
    xl: {
      fontSize: '100px',
    },
    lg: {
      fontSize: '60px',
    },
    md: {
      fontSize: '40px',
    },
    sm: {
      fontSize: '30px',
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
  },
};
