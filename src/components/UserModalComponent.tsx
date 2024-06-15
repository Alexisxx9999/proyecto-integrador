// components/NewUserModal.tsx
import { User } from '@/models/user';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: User) => void;
  userToUpdate?: User | null;
  titleLabel: string;
}


const UserModal: React.FC<NewUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  userToUpdate,
  titleLabel
}) => {
  const [userData, setUserData] = useState<User>({} as User);

  Modal.setAppElement('#root');
  
  useEffect(() => {
    if (userToUpdate) {
      setUserData(userToUpdate);
    } else {
      // Si no hay datos para actualizar, reiniciamos el formulario
      setUserData({ name: '', email: '', lastname: '', role: '', password: '' } as User);
    }
  }, [userToUpdate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSave = () => {
    onSave(userData);
    setUserData({ name: '', email: '', lastname: '', role: '', password: '' } as User); // Reiniciar el formulario después de guardar
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel={titleLabel}
      className="modal fixed inset-0 flex items-center justify-center"
      overlayClassName="overlay fixed inset-0 bg-black opacity-92"
    >
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-black">
          {titleLabel}
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Nombres:
              <input
                className="mt-1 p-2 w-full border rounded-md"
                type="text"
                value={userData.name}
                onChange={(e) => handleInputChange(e, 'name')}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Apellido:
              <input
                className="mt-1 p-2 w-full border rounded-md"
                type="text"
                value={userData.lastname}
                onChange={(e) => handleInputChange(e, 'lastname')}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email:
              <input
                className="mt-1 p-2 w-full border rounded-md"
                type="email"
                value={userData.email}
                onChange={(e) => handleInputChange(e, 'email')}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password:
              <input
                className="mt-1 p-2 w-full border rounded-md"
                type="password"
                value={userData.password}
                onChange={(e) => handleInputChange(e, 'password')}
              />
            </label>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              type="button"
              onClick={handleSave}
            >
              Guardar
            </button>
            <button
              className="ml-2 text-gray-500 hover:text-gray-600"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UserModal;
