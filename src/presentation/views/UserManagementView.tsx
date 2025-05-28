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
      <div className="user-management-header">
        <div className="header-content">
          <h1>User Management System</h1>
          <div className="stats-bar">
            <div className="stat">
              <span className="stat-value">{users.length}</span>
              <span className="stat-label">Total Users</span>
            </div>
            <div className="stat">
              <span className="stat-value">{users.filter(u => new Date(u.createdAt).toDateString() === new Date().toDateString()).length}</span>
              <span className="stat-label">Created Today</span>
            </div>
          </div>
        </div>
        
        <div className="architecture-flow">
          <h3>🔄 Data Flow Demonstration</h3>
          <div className="flow-steps">
            <div className="flow-step">UI → Controller</div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">Use Case</div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">Repository</div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">Database</div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="error-message">
          <strong>⚠️ Error:</strong> {error}
          <small>This error was caught and handled by the Presentation Layer</small>
        </div>
      )}

      <div className="action-section">
        {!showForm && (
          <button className="create-button" onClick={() => setShowForm(true)}>
            ➕ Create New User
          </button>
        )}

        {showForm && (
          <div className="form-section">
            <div className="form-info">
              <h3>📝 {editingUser ? 'Edit User' : 'Create New User'}</h3>
              <p>This form demonstrates the Presentation Layer capturing user input and validating it through Domain Value Objects</p>
            </div>
            <UserForm
              user={editingUser}
              onSubmit={editingUser ? handleUpdate : handleCreate}
              onCancel={handleCancel}
            />
          </div>
        )}
      </div>

      <div className="list-section">
        <div className="list-header">
          <h3>👥 User Database</h3>
          <p>Data retrieved through Clean Architecture layers: Controller → Use Case → Repository → Database</p>
        </div>
        <UserList
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};