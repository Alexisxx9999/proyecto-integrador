"use client";
import { User } from "@/models/user";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import UsersTable from "@/components/UsersTableComponent";
import UserModal from "@/components/UserModalComponent";
import DeleteModal from "@/components/DeleteModalComponent";

export default function Usuarios() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/usuario');
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getUsers = async () => {
    await fetchUsers();
  };

  const handleUpdate = (userId: number) => {
    // Encontrar el usuario a actualizar
    const userToUpdate = users.find((user) => user.id === userId);
    if (userToUpdate) {
      setUserToUpdate(userToUpdate);
      setModalOpen(true);
    }
    else
      setModalOpen(true);
  };

  const handleNew = () => {
    // Lógica para crear un nuevo usuario
    setUserToUpdate(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveUser = async (userData: User) => {
    try {
      let response;

      if (userData.id) {
        response = await fetch(`/api/usuario/${userData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
      } else {
        response = await fetch('/api/usuario', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });
      }

      if (!response.ok) {
        throw new Error('Error al guardar el usuario');
      }

      // Actualizamos el estado de los usuarios después de la operación
      const updatedData = await response.json();
      getUsers();
      handleCloseModal();
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
      // Puedes manejar el error de manera adecuada, como mostrar un mensaje al usuario.
    }
  };

  const handleDelete = (userId: number) => {
    const userToDelete = users.find((user) => user.id === userId);
    if (userToDelete) {
      setUserToDelete(userToDelete);
      setDeleteModalOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!userToDelete) {
        return;
      }

      const response = await fetch(`/api/usuario/${userToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el usuario');
      }

      getUsers();
      setDeleteModalOpen(false);
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };


  return (
    <main id="root" className="container mx-auto mt-8 text-white">
      <h1 className="text-3xl font-semibold mb-4">Tabla de Usuarios</h1>
      <div className="flex justify-between mb-4">
        <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded" onClick={handleNew}>➕ Nuevo</button>
      </div>
      <UsersTable users={users} onUpdate={handleUpdate} onDelete={handleDelete} />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
      
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        userToUpdate={userToUpdate}
        titleLabel="Nuevo usuario"
      />
    </main>
  );
}
