// components/UsersTable.tsx
import React from 'react';
import { format } from 'date-fns';
import { User } from '@/models/user';

interface UsersTableProps {
  users: User[] | undefined;
  onUpdate: (userId: number) => void;
  onDelete: (userId: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onUpdate, onDelete }) => {
  return (
    <table className="min-w-full bg-gray-800 border border-gray-600">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">Email</th>
          <th className="py-2 px-4 border-b">Nombre</th>
          <th className="py-2 px-4 border-b">Apellido</th>
          <th className="py-2 px-4 border-b">Fecha creación</th>
          <th className="py-2 px-4 border-b">Fecha actualización</th>
          <th className="py-2 px-4 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users && users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-700">
            <td className="py-2 px-4 border-b">{user.id}</td>
            <td className="py-2 px-4 border-b">{user.email}</td>
            <td className="py-2 px-4 border-b">{user.name}</td>
            <td className="py-2 px-4 border-b">{user.lastname}</td>
            <td className="py-2 px-4 border-b">
              {user.created_at
                ? format(new Date(user.created_at), 'yyyy-MM-dd HH:mm:ss')
                : 'Fecha no disponible'}
            </td>
            <td className="py-2 px-4 border-b">
              {user.updated_at
                ? format(new Date(user.updated_at), 'yyyy-MM-dd HH:mm:ss')
                : 'Fecha no disponible'}
            </td>
            <td className="py-2 px-4 border-b">
              <button
                className="mr-2 text-blue-500"
                onClick={() => onUpdate(user.id)}
              >
                🔄 Actualizar
              </button>
              <button
                className="text-red-500"
                onClick={() => onDelete(user.id)}
              >
                ❌ Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
