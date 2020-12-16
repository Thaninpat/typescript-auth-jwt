import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'styled-components';

import '../fontAwesome';

import { theme } from '../theme';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContextProvider';
import Backdrop from './modal/Backdrop';
import SignUp from './SignUp';
import SignIn from './SignIn';
import RequestResetPassword from './RequestResetPassword';
import ResetPassword from './ResetPassword';
import { DisplayedPage, GlobalStyle, StyledPage } from './styles/layout.styles';

interface Props {
  title?: string;
}

const Layout: React.FC<Props> = ({ children }) => {
  const { authAction, handleAuthAction } = useContext(AuthContext);

  const { pathname, query } = useRouter();

  useEffect(() => {
    if (query?.resetToken) handleAuthAction('reset');
  }, [query]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <StyledPage>
          <Head>
            <title>
              {pathname === '/' ? 'HOME' : pathname.split('/')[1].toUpperCase()}
            </title>
            <meta charSet='utf-8' />
            <meta
              name='viewport'
              content='initial-scale=1.0, width=device-width'
            />
            <link
              href='https://fonts.googleapis.com/css2?family=Noto+Sans&family=Roboto&display=swap'
              rel='stylesheet'
            />
          </Head>

          <NavBar />

          <DisplayedPage>
            <>{children}</>
            <>
              {authAction !== 'close' && (
                <>
                  {authAction === 'signup' && (
                    <>
                      <Backdrop />
                      <SignUp />
                    </>
                  )}
                  {authAction === 'signin' && (
                    <>
                      <Backdrop />
                      <SignIn />
                    </>
                  )}
                  {authAction === 'request' && (
                    <>
                      <Backdrop />
                      <RequestResetPassword />
                    </>
                  )}
                  {authAction === 'reset' && (
                    <>
                      <Backdrop />
                      <ResetPassword token={query?.resetToken as string} />
                    </>
                  )}
                </>
              )}
            </>
          </DisplayedPage>
        </StyledPage>
      </>
    </ThemeProvider>
  );
};
export default Layout;
