import {createGlobalStyle} from 'styled-components';
import {GlobalStyle as PalJSGlobalStyle} from '@paljs/ui';

export const GlobalStyle = createGlobalStyle`
  ${PalJSGlobalStyle}
  body {
    margin: 0;
    padding: 0;
  }
`;