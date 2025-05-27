import { User, Email } from '../entities/User';
import { UserRepository } from '../../application/repositories/UserRepository';

export interface UpdateUserDTO {
  email?: string;
  name?: string;
}

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string, data: UpdateUserDTO): Promise<User> {
    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Validate email if provided
    if (data.email) {
      const emailVO = new Email(data.email);
      
      // Check if new email is already taken by another user
      const userWithEmail = await this.userRepository.findByEmail(emailVO.getValue());
      if (userWithEmail && userWithEmail.id !== id) {
        throw new Error('Email already in use');
      }
      
      data.email = emailVO.getValue();
    }

    // Update user
    const updatedData = {
      ...data,
      updatedAt: new Date()
    };

    return await this.userRepository.update(id, updatedData);
  }
}