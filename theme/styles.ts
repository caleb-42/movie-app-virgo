import { mode } from '@chakra-ui/theme-tools';

export const global = (props) => ({
  'html, body': {
    fontFamily: 'body',
    height: '100%',
    color: mode('#757575', 'whiteAlpha.900')(props),
    bg: mode('#fff', '#000')(props),
    lineHeight: 'base',
  },
  '#__next': {
    width: '100%',
    height: '100%',
    overflow: 'visible',
    display: 'flex',
    'flex-direction': 'column',
  },
});
