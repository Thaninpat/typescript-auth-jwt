import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../context/AuthContextProvider';
import { Actions, HamMenu, Header, Logo, Nav, Ul } from './styles/nav.styles';
import { isAdmin } from '../helpers/authHelpers';
import { SIGN_OUT } from '../apollo/mutations';

interface Props {}

const NavBar: React.FC<Props> = () => {
  const { handleAuthAction, loggedInUser, setAuthUser } = useContext(
    AuthContext
  );

  const router = useRouter();

  const [signout] = useMutation<{ signout: { message: string } }>(SIGN_OUT);

  const handleSignout = async () => {
    try {
      const response = await signout();

      if (response?.data?.signout?.message) {
        // TODO: Set auth user to null
        setAuthUser(null);

        // TODO: Sync signout
        window.localStorage.setItem('signout', Date.now().toString());

        // TODO: Push user to home page
        router.push('/');
      }
    } catch (error) {
      //     console.log(error);
      alert('Sorry cannot proceed.');
    }
  };

  return (
    <Header>
      <Nav>
        <Link href='/'>
          <Logo>
            <a className={router.pathname === '/' ? 'active' : ''}>
              <img
                src='https://scontent.fbkk5-1.fna.fbcdn.net/v/t1.0-9/65110669_2214908828623823_1941056713616523264_n.jpg?_nc_cat=109&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEvqmI2BMhmXZQb7ZHW6AkjNLOEqOJp3FI0s4So4mncUrUlynmCKTizuS5v0BnZL4b8Mvc_f29j_0TUInGdEnng&_nc_ohc=AgkuHkh8dkcAX87apXD&_nc_ht=scontent.fbkk5-1.fna&oh=3bff16aa8cdf3ef6da429d81b1785f38&oe=600979F2'
                alt='logo'
                width={60}
                height={60}
              />
            </a>
          </Logo>
        </Link>

        <Ul>
          {!loggedInUser ? (
            ''
          ) : (
            <>
              <Link href='/'>
                <a className={router.pathname === '/' ? 'active' : ''}>Home</a>
              </Link>

              <Link href='/products'>
                <a className={router.pathname === '/products' ? 'active' : ''}>
                  Products
                </a>
              </Link>
            </>
          )}

          {loggedInUser && (
            <Link href='/dashboard'>
              <a className={router.pathname === '/dashboard' ? 'active' : ''}>
                Dashboard
              </a>
            </Link>
          )}
          {loggedInUser && isAdmin(loggedInUser) && (
            <Link href='/admin'>
              <a className={router.pathname === '/admin' ? 'active' : ''}>
                Admin
              </a>
            </Link>
          )}
        </Ul>
        <Actions>
          {loggedInUser ? (
            <button onClick={handleSignout}>Sign Out</button>
          ) : (
            <>
              <button onClick={() => handleAuthAction('signin')}>
                Sign In
              </button>
              <button onClick={() => handleAuthAction('signup')}>
                Sign Up
              </button>
            </>
          )}
        </Actions>
        <HamMenu>
          <FontAwesomeIcon icon={['fas', 'bars']} size='2x' />
        </HamMenu>
      </Nav>
    </Header>
  );
};

export default NavBar;
