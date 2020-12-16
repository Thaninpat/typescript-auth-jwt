import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm, ErrorMessage } from 'react-hook-form';
import Loader from 'react-loader-spinner';

import Modal from './modal/Modal';
import { AuthContext } from '../context/AuthContextProvider';
import {
  FormContainer,
  Header,
  StyledForm,
  InputContainer,
  Input,
  Button,
  StyledSwitchAction,
  Divider,
  StyledSocial,
  StyledError,
} from './styles/styles';
import { SIGN_UP } from '../apollo/mutations';
import { useMutation } from '@apollo/client';
import { User, SignupArgs } from '../types';

interface Props {}

const SignUp: React.FC<Props> = () => {
  const { handleAuthAction, setAuthUser } = useContext(AuthContext);
  const { register, errors, handleSubmit } = useForm<{
    username: string;
    email: string;
    password: string;
  }>();

  const router = useRouter();

  const [signup, { loading, error }] = useMutation<
    { signup: User },
    SignupArgs
  >(SIGN_UP);

  const submitSignup = handleSubmit(async ({ username, email, password }) => {
    console.log(username, ':', email, ':', password);
    try {
      const response = await signup({
        variables: { username, email, password },
      });
      if (response?.data?.signup) {
        const { signup } = response.data;

        if (signup) {
          // TODO: Close form
          handleAuthAction('close');

          // TODO: Set logged in user in context API
          setAuthUser(signup);

          // TODO: Push user to their dashboard
          router.push('/dashboard');
        }
      }
    } catch (error) {
      // console.log(error);
      setAuthUser(null);
    }
  });

  return (
    <Modal>
      <FormContainer>
        <Header>
          <h2>Sign Up</h2>
        </Header>

        <StyledSocial>
          <button className='facebook'>
            <FontAwesomeIcon icon={['fab', 'facebook-f']} size='lg' />
            <a>Sign in with Facebook</a>
          </button>
          <button className='google'>
            <FontAwesomeIcon icon={['fab', 'google']} />
            <a>Sign in with Google</a>
          </button>
        </StyledSocial>

        <Divider />

        <StyledForm onSubmit={submitSignup}>
          <p className='email_section_label'>or sign up with an email</p>
          <InputContainer>
            <label>Username</label>
            <Input
              type='text'
              name='username'
              id='username'
              placeholder='Your username'
              autoComplete='new-password'
              ref={register({
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
                maxLength: {
                  value: 60,
                  message: 'Username must be not more than 60 characters ',
                },
              })}
            />
            <ErrorMessage errors={errors} name='username'>
              {({ message }) => <StyledError>{message}</StyledError>}
            </ErrorMessage>
          </InputContainer>

          <InputContainer>
            <label>Email</label>

            <Input
              type='text'
              name='email'
              id='email'
              placeholder='Your email'
              autoComplete='new-password'
              ref={register({
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email is in wrong format',
                },
              })}
            />
            <ErrorMessage errors={errors} name='email'>
              {({ message }) => <StyledError>{message}</StyledError>}
            </ErrorMessage>
          </InputContainer>

          <InputContainer>
            <label>Password</label>

            <Input
              type='password'
              name='password'
              id='password'
              placeholder='Your password'
              ref={register({
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                maxLength: {
                  value: 60,
                  message: 'Password must be not more than 50 characters ',
                },
              })}
            />
            <ErrorMessage errors={errors} name='password'>
              {({ message }) => <StyledError>{message}</StyledError>}
            </ErrorMessage>
          </InputContainer>

          <Button
            disabled={loading}
            style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? (
              <Loader
                type='Oval'
                color='white'
                height={30}
                width={30}
                timeout={30000}
              />
            ) : (
              'Submit'
            )}
          </Button>

          {error && (
            <StyledError>
              {error.graphQLErrors[0]?.message ||
                'Sorry, something went wrong!!!'}
            </StyledError>
          )}
        </StyledForm>
        <StyledSwitchAction>
          <p>
            Already have account?{' '}
            <span
              style={{ cursor: 'pointer', color: 'red' }}
              onClick={() => handleAuthAction('signin')}
            >
              sign in
            </span>{' '}
            instead.
          </p>
        </StyledSwitchAction>
      </FormContainer>
    </Modal>
  );
};

export default SignUp;
