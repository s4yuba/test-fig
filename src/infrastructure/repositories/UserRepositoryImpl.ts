import { User } from '../../domain/entities/User';
import { UserRepository } from '../../application/repositories/UserRepository';
import { InMemoryDatabase } from '../database/Database';

export class UserRepositoryImpl implements UserRepository {
  private readonly collection = 'users';

  constructor(private database: InMemoryDatabase) {}

  async findById(id: string): Promise<User | null> {
    return this.database.getById<User>(this.collection, id);
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = this.database.get<User>(this.collection);
    return users.find(user => user.email === email) || null;
  }

  async findAll(): Promise<User[]> {
    return this.database.get<User>(this.collection);
  }

  async save(user: User): Promise<User> {
    return this.database.set(this.collection, user);
  }

  async update(id: string, updates: Partial<User>): Promise<User> {
    const updated = this.database.update<User>(this.collection, id, updates);
    if (!updated) {
      throw new Error('User not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const deleted = this.database.delete(this.collection, id);
    if (!deleted) {
      throw new Error('User not found');
    }
  }
}