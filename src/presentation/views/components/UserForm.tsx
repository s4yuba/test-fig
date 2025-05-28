import React, { useState, useEffect } from 'react';
import { UserViewModel } from '../../presenters/UserPresenter';

interface UserFormProps {
  user?: UserViewModel | null;
  onSubmit: (data: { email: string; name: string }) => void;
  onCancel: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        name: user.name
      });
    }
  }, [user]);

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Invalid email format';
    return null;
  };

  const validateName = (name: string): string | null => {
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return null;
  };

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    const emailError = validateEmail(formData.email);
    const nameError = validateName(formData.name);
    
    if (emailError) errors.email = emailError;
    if (nameError) errors.name = nameError;
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    
    if (validateForm()) {
      onSubmit(formData);
    }
    
    setIsValidating(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-header">
        <h2>{user ? '✏️ Edit User' : '➕ Create User'}</h2>
        <div className="validation-info">
          <small>🔍 Form validation demonstrates Domain Value Objects in action</small>
        </div>
      </div>
      
      <div className="form-field">
        <label htmlFor="name">
          <span className="label-text">Name:</span>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={validationErrors.name ? 'error' : ''}
            placeholder="Enter user's full name"
            required
          />
        </label>
        {validationErrors.name && (
          <div className="field-error">⚠️ {validationErrors.name}</div>
        )}
      </div>
      
      <div className="form-field">
        <label htmlFor="email">
          <span className="label-text">Email:</span>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={validationErrors.email ? 'error' : ''}
            placeholder="user@example.com"
            required
          />
        </label>
        {validationErrors.email && (
          <div className="field-error">⚠️ {validationErrors.email}</div>
        )}
      </div>
      
      <div className="form-actions">
        <button 
          type="submit" 
          className="submit-button"
          disabled={isValidating}
        >
          {isValidating ? '⏳ Validating...' : user ? '💾 Update User' : '✨ Create User'}
        </button>
        <button 
          type="button" 
          className="cancel-button"
          onClick={onCancel}
        >
          ❌ Cancel
        </button>
      </div>
      
      <div className="architecture-note">
        <small>
          💡 <strong>Architecture Note:</strong> This form uses Presentation Layer validation 
          that mirrors Domain Layer value objects (Email validation)
        </small>
      </div>
    </form>
  );
};