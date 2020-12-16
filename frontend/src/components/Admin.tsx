import React from 'react';

import AdminRow from './AdminRow';
import { users } from '../helpers/data';

import { Div, Table } from './styles/admin.styles';

const Admin: React.FC = () => {
  return (
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
            <th colSpan={4} style={{ width: '25%' }}>
              Role
            </th>
            <th rowSpan={2} style={{ width: '10%' }}>
              Edit Roles
            </th>
          </tr>
          {/* Edit Roles Sub Headers */}
          <tr>
            <th>Client</th>
            <th>Editor</th>
            <th>Admin</th>
            <th>Super</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <AdminRow user={user} key={user.id} />
          ))}
        </tbody>
      </Table>
    </Div>
  );
};

export default Admin;
