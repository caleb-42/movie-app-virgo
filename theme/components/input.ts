import { css } from '@emotion/react';

export default {
  // The styles all button have in common
  baseStyle: (props) => {
    return {
      fontWeight: '600',
      //borderRadius: '20px',
      color: props.colorMode === 'dark' ? '#7e7e7e' : '#333',

      padding: '20px 10px',
      '&:focus': css`
        outline: 0;
        border-color: transparent;
        box-shadow: 0 0 1px 1px ${props.theme.colors.primaryColor.main};
      `,
      _placeholder: {
        fontWeight: 'normal',
        color: '#989898',
      },
    };
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    //variant: 'outline',
  },
};
