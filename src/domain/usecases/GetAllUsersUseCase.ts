import { User } from '../entities/User';
import { UserRepository } from '../../application/repositories/UserRepository';

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}