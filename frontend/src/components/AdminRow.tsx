import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from '@apollo/client';

import Loader from 'react-loader-spinner';
import { UPDATE_ROLES } from '../apollo/mutations';
import { DELETE_USER } from '../apollo/mutations';

import { Role, User } from '../types';
import { isSuperAdmin } from '../helpers/authHelpers';
import { DeleteBtn } from './styles/admin.styles';
import { QUERY_USERS } from '../apollo/queries';

interface Props {
  user: User;
  admin: User | null;
}

const AdminRow: React.FC<Props> = ({ user, admin }) => {
  const { roles } = user;
  const initialState = {
    CLIENT: roles.includes('CLIENT'),
    ITEMEDITOR: roles.includes('ITEMEDITOR'),
    ADMIN: roles.includes('ADMIN'),
  };

  const [isEditing, setIsEditing] = useState(false);
  const [roleState, setRoleState] = useState(initialState);

  const [updateRoles, { loading, error }] = useMutation<
    { updateRoles: User },
    { userId: string; newRoles: Role[] }
  >(UPDATE_ROLES);

  useEffect(() => {
    if (error)
      alert(
        error.graphQLErrors[0]?.message ||
          'Sorry, something went wrong --> AdminRow'
      );
  }, [error]);

  const handleSubmitUpdateRoles = async (userId: string) => {
    try {
      const newRoles: Role[] = [];
      Object.entries(roleState).forEach(([k, v]) =>
        v ? newRoles.push(k as Role) : null
      ); // {ITEMEDITOR: true, ADMIN: false} --> [[ITEMEDITOR, true],[ADMIN, false]]

      // Check if the "user.roles" array has not been change --> do not call to backend.
      if (user.roles.length === newRoles.length) {
        const checkRoles = user.roles.map((role) => newRoles.includes(role));
        if (!checkRoles.includes(false)) {
          alert('Nothing change.');
          setIsEditing(false);
          return;
        }
      }

      const response = await updateRoles({
        variables: { userId, newRoles },
        refetchQueries: [{ query: QUERY_USERS }],
      });
      if (response.data?.updateRoles) {
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(roleState);

  const [deleteUser, deleteUserRes] = useMutation<
    { deleteUser: { message: string } },
    { userId: string }
  >(DELETE_USER);

  useEffect(() => {
    if (deleteUserRes.error)
      alert(deleteUserRes.error.graphQLErrors[0]?.message);
  }, [deleteUserRes.error]);

  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await deleteUser({
        variables: { userId },
        refetchQueries: [{ query: QUERY_USERS }],
      });

      if (res.data?.deleteUser.message) {
        alert(res.data?.deleteUser.message);
      }
    } catch (error) {
      console.log(error);
      alert((error as Error).message);
    }
  };

  return (
    <tr key={user.id}>
      {/* Name */}
      <td>{user.username}</td>

      {/* Email */}
      <td>{user.email}</td>

      {/* CreatedAt */}
      <td>{user.createdAt}</td>

      {/* Manage Roles Section */}
      {/* client role */}
      {isSuperAdmin(admin) && (
        <>
          <td
            style={{
              background: !isEditing ? 'white' : undefined,
              cursor: isEditing ? 'pointer' : undefined,
            }}
            className='td_role'
          >
            <FontAwesomeIcon
              icon={['fas', 'check-circle']}
              className='true'
              size='lg'
              style={{ color: 'black', cursor: 'not-allowed' }}
            />
          </td>

          {/* item editor role */}
          <td
            style={{
              background: !isEditing ? 'white' : undefined,
              cursor: isEditing ? 'pointer' : undefined,
            }}
            className='td_role'
            onClick={
              isEditing
                ? () =>
                    setRoleState((prev) => ({
                      ...prev,
                      ITEMEDITOR: !prev.ITEMEDITOR,
                    }))
                : undefined
            }
          >
            {roleState.ITEMEDITOR ? (
              <FontAwesomeIcon
                icon={['fas', 'check-circle']}
                className='true'
                size='lg'
                style={{ color: !isEditing ? 'black' : undefined }}
              />
            ) : (
              <FontAwesomeIcon
                icon={['fas', 'times-circle']}
                className='false'
                size='lg'
                style={{ color: !isEditing ? 'lightgray' : undefined }}
              />
            )}
          </td>

          {/* admin role */}
          <td
            style={{
              background: !isEditing ? 'white' : undefined,
              cursor: isEditing ? 'pointer' : undefined,
            }}
            className='td_role'
            onClick={
              isEditing
                ? () =>
                    setRoleState((prev) => ({
                      ...prev,
                      ADMIN: !prev.ADMIN,
                    }))
                : undefined
            }
          >
            <>
              {roleState.ADMIN ? (
                <FontAwesomeIcon
                  icon={['fas', 'check-circle']}
                  className='true'
                  size='lg'
                  style={{ color: !isEditing ? 'black' : undefined }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={['fas', 'times-circle']}
                  className='false'
                  size='lg'
                  style={{ color: !isEditing ? 'lightgray' : undefined }}
                />
              )}
            </>
          </td>

          {/* super admin role */}
          <td>
            {isSuperAdmin(user) && (
              <FontAwesomeIcon
                style={{ cursor: 'not-allowed' }}
                icon={['fas', 'check-circle']}
                size='lg'
              />
            )}
          </td>

          {/* action */}

          {loading ? (
            <td>
              <Loader
                type='Oval'
                color='teal'
                height={30}
                width={30}
                timeout={30000}
              />
            </td>
          ) : isEditing ? (
            <td>
              <p className='role_action'>
                <button>
                  <FontAwesomeIcon
                    icon={['fas', 'times']}
                    color='red'
                    onClick={() => {
                      setRoleState(initialState);
                      setIsEditing(false);
                    }}
                    size='lg'
                  />
                </button>
                <button onClick={() => handleSubmitUpdateRoles(user.id)}>
                  <FontAwesomeIcon
                    icon={['fas', 'check']}
                    color='teal'
                    size='lg'
                  />
                </button>
              </p>
            </td>
          ) : (
            <td>
              <button onClick={() => setIsEditing(true)}>Edit</button>
            </td>
          )}

          <td>
            {!isSuperAdmin(user) ? (
              <DeleteBtn
                style={{ cursor: isEditing ? 'not-allowed' : undefined }}
                disabled={isEditing}
                onClick={() => {
                  if (!confirm(`Are you sure to delete this ${user.username}`))
                    return;
                  handleDeleteUser(user.id);
                }}
              >
                {deleteUserRes.loading ? (
                  <Loader
                    type='Oval'
                    color='white'
                    height={30}
                    width={30}
                    timeout={30000}
                  />
                ) : (
                  <FontAwesomeIcon icon={['fas', 'trash-alt']} size='lg' />
                )}
              </DeleteBtn>
            ) : null}
          </td>
        </>
      )}
    </tr>
  );
};

export default AdminRow;
