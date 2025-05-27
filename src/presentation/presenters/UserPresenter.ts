import { User } from '../../domain/entities/User';

export interface UserViewModel {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserListViewModel {
  users: UserViewModel[];
  total: number;
}

export class UserPresenter {
  static toViewModel(user: User): UserViewModel {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    };
  }

  static toListViewModel(users: User[]): UserListViewModel {
    return {
      users: users.map(user => this.toViewModel(user)),
      total: users.length
    };
  }

  static presentError(error: Error): { error: string; code: string } {
    const errorMap: Record<string, string> = {
      'User not found': 'USER_NOT_FOUND',
      'User with this email already exists': 'EMAIL_EXISTS',
      'Email already in use': 'EMAIL_IN_USE',
      'Invalid email format': 'INVALID_EMAIL'
    };

    return {
      error: error.message,
      code: errorMap[error.message] || 'UNKNOWN_ERROR'
    };
  }
}