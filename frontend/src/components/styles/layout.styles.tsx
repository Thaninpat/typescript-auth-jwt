import styled, { createGlobalStyle } from 'styled-components';
import { config, dom } from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

export const GlobalStyle = createGlobalStyle`
  ${dom.css()}

   html {
      box-sizing: border-box;
      font-size: 10px;
   }
   *, *:before, *:after {
      box-sizing: inherit;
   }
   body {
      margin: 0;
      padding: 0;
      font-size: 1.4rem;
      font-family: 'Noto Sans', sans-serif;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;
   }

   button {
    border: none;
    background: white;
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.darkTeal};
    padding: 0.5rem 1rem;
    border-radius: ${(props) => props.theme.radius};
    cursor: pointer;
    transition: background-color ${(props) => props.theme.transition} ease-in;

    &:hover {
        background: ${(props) => props.theme.colors.lightGrey};
    }
   }
`;

export const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.fontColors.primary};
`;

export const DisplayedPage = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  justify-content: center;
`;
