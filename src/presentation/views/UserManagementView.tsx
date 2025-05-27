import React, { useState, useEffect } from 'react';
import { UserList } from './components/UserList';
import { UserForm } from './components/UserForm';
import { UserViewModel } from '../presenters/UserPresenter';
import { UserController } from '../controllers/UserController';

interface UserManagementViewProps {
  controller: UserController;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({ controller }) => {
  const [users, setUsers] = useState<UserViewModel[]>([]);
  const [editingUser, setEditingUser] = useState<UserViewModel | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users
  const fetchUsers = async () => {
    const response = await controller.getAllUsers({});
    if (response.status === 200) {
      setUsers(response.data.users);
    } else {
      setError(response.error.error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (data: { email: string; name: string }) => {
    const response = await controller.createUser({ body: data });
    if (response.status === 201) {
      await fetchUsers();
      setShowForm(false);
      setError(null);
    } else {
      setError(response.error.error);
    }
  };

  const handleUpdate = async (data: { email: string; name: string }) => {
    if (!editingUser) return;
    
    const response = await controller.updateUser({
      params: { id: editingUser.id },
      body: data
    });
    
    if (response.status === 200) {
      await fetchUsers();
      setEditingUser(null);
      setShowForm(false);
      setError(null);
    } else {
      setError(response.error.error);
    }
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const response = await controller.deleteUser({ params: { id: userId } });
      if (response.status === 204) {
        await fetchUsers();
        setError(null);
      } else {
        setError(response.error.error);
      }
    }
  };

  const handleEdit = (user: UserViewModel) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setShowForm(false);
    setError(null);
  };

  return (
    <div className="user-management">
      <h1>User Management</h1>
      
      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      {!showForm && (
        <button onClick={() => setShowForm(true)}>Create New User</button>
      )}

      {showForm && (
        <UserForm
          user={editingUser}
          onSubmit={editingUser ? handleUpdate : handleCreate}
          onCancel={handleCancel}
        />
      )}

      <UserList
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};