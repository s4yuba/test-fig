import React from 'react';
import { UserViewModel } from '../../presenters/UserPresenter';

interface UserListProps {
  users: UserViewModel[];
  onEdit: (user: UserViewModel) => void;
  onDelete: (userId: string) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="user-list">
      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👤</div>
          <h3>No Users Yet</h3>
          <p>Start by creating your first user to see how the Clean Architecture handles data flow</p>
          <div className="empty-architecture-note">
            <small>
              💡 When you create a user, you'll see the data flow through:
              <br />UI → Controller → Use Case → Repository → Database
            </small>
          </div>
        </div>
      ) : (
        <div className="user-table-container">
          <div className="table-header">
            <h3>📊 User Database ({users.length} users)</h3>
            <div className="table-info">
              <small>Data retrieved via: Repository Pattern → Domain Entities</small>
            </div>
          </div>
          
          <table className="user-table">
            <thead>
              <tr>
                <th>👤 Name</th>
                <th>📧 Email</th>
                <th>📅 Created</th>
                <th>🛠️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="user-row">
                  <td className="user-name">
                    <strong>{user.name}</strong>
                  </td>
                  <td className="user-email">
                    <code>{user.email}</code>
                  </td>
                  <td className="user-date">
                    {new Date(user.createdAt).toLocaleDateString()}
                    <small>
                      {new Date(user.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </small>
                  </td>
                  <td className="user-actions">
                    <button 
                      className="edit-button"
                      onClick={() => onEdit(user)}
                      title="Edit user via UpdateUserUseCase"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => onDelete(user.id)}
                      title="Delete user via DeleteUserUseCase"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="table-footer">
            <small>
              🏗️ <strong>Clean Architecture in Action:</strong> Each user action triggers a specific Use Case, 
              demonstrating separation of concerns and single responsibility principle
            </small>
          </div>
        </div>
      )}
    </div>
  );
};