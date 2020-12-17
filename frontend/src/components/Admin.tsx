import React from 'react';
import { useQuery } from '@apollo/client';
import { Div, Table } from './styles/admin.styles';

import AdminRow from './AdminRow';

import { QUERY_USERS } from '../apollo/queries';
import { User } from '../types';
import Loader from 'react-loader-spinner';
import { isSuperAdmin } from '../helpers/authHelpers';

const Admin: React.FC<{ admin: User | null }> = ({ admin }) => {
  const { data, loading, error } = useQuery<{ users: User[] }>(QUERY_USERS, {
    fetchPolicy: 'network-only',
  });
  return loading ? (
    <Loader type='Oval' color='teal' height={50} width={50} timeout={30000} />
  ) : error ? (
    <p>Sorry, something went wrong : Admin</p>
  ) : (
    <Div>
      <h3>Permission Management</h3>
      <Table>
        <thead>
          <tr>
            {/* Header */}
            <th rowSpan={2} style={{ width: '25%' }}>
              Name
            </th>
            <th rowSpan={2} style={{ width: '20%' }}>
              Email
            </th>
            <th rowSpan={2} style={{ width: '15%' }}>
              Created At
            </th>
            {isSuperAdmin(admin) && (
              <>
                <th colSpan={4} style={{ width: '25%' }}>
                  Role
                </th>
                <th rowSpan={2} style={{ width: '10%' }}>
                  Edit Roles
                </th>
              </>
            )}
          </tr>
          {/* Edit Roles Sub Headers */}
          {isSuperAdmin(admin) && (
            <tr>
              <th>Client</th>
              <th>Editor</th>
              <th>Admin</th>
              <th>Super</th>
            </tr>
          )}
        </thead>

        <tbody>
          {data &&
            data.users.map((user) => (
              <AdminRow user={user} key={user.id} admin={admin} />
            ))}
        </tbody>
      </Table>
    </Div>
  );
};

export default Admin;
