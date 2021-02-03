import { configure, addDecorator } from '@storybook/react';
import React from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/react';
import ThemeDecorator from './.storybook/themeDecorator';

const req = require.context('../components', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}
configure(loadStories, module);

const StylesDecorator = (storyFn) => (
  <ThemeProvider>
    <CSSReset />
    {storyFn()}
  </ThemeProvider>
);

addDecorator(StylesDecorator);
addDecorator(ThemeDecorator);
