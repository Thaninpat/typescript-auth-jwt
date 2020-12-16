import Admin from '../components/Admin';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { AuthContext } from '../context/AuthContextProvider';

import { isAdmin } from '../helpers/authHelpers';

export default function AdminPage() {
  const { loggedInUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    //TODO: if user is not authenticated, push to home page
    if (!loggedInUser) {
      router.push('/');
    } else {
      if (!isAdmin(loggedInUser)) {
        // Push user to dashboard page
        alert('No Authorization');
        router.push('/dashboard');
      }
    }
  }, [loggedInUser]);

  return !isAdmin(loggedInUser) ? (
    <Loader type='Oval' color='teal' height={30} width={30} timeout={30000} />
  ) : (
    <Admin />
  );
}
