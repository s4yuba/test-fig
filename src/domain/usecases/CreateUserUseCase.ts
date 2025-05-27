import { User, Email } from '../entities/User';
import { UserRepository } from '../../application/repositories/UserRepository';

export interface CreateUserDTO {
  email: string;
  name: string;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    // Validate email using domain value object
    const emailVO = new Email(data.email);
    
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(emailVO.getValue());
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: User = {
      id: this.generateId(),
      email: emailVO.getValue(),
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return await this.userRepository.save(newUser);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}