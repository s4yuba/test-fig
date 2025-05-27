// Dependency Injection Container
import { InMemoryDatabase } from './infrastructure/database/Database';
import { UserRepositoryImpl } from './infrastructure/repositories/UserRepositoryImpl';
import { CreateUserUseCase } from './domain/usecases/CreateUserUseCase';
import { GetUserUseCase } from './domain/usecases/GetUserUseCase';
import { GetAllUsersUseCase } from './domain/usecases/GetAllUsersUseCase';
import { UpdateUserUseCase } from './domain/usecases/UpdateUserUseCase';
import { DeleteUserUseCase } from './domain/usecases/DeleteUserUseCase';
import { UserController } from './presentation/controllers/UserController';

export class DependencyContainer {
  private static instance: DependencyContainer;
  
  // Infrastructure
  private database: InMemoryDatabase;
  private userRepository: UserRepositoryImpl;
  
  // Use Cases
  private createUserUseCase: CreateUserUseCase;
  private getUserUseCase: GetUserUseCase;
  private getAllUsersUseCase: GetAllUsersUseCase;
  private updateUserUseCase: UpdateUserUseCase;
  private deleteUserUseCase: DeleteUserUseCase;
  
  // Controllers
  private userController: UserController;

  private constructor() {
    // Initialize infrastructure
    this.database = new InMemoryDatabase();
    this.userRepository = new UserRepositoryImpl(this.database);
    
    // Initialize use cases
    this.createUserUseCase = new CreateUserUseCase(this.userRepository);
    this.getUserUseCase = new GetUserUseCase(this.userRepository);
    this.getAllUsersUseCase = new GetAllUsersUseCase(this.userRepository);
    this.updateUserUseCase = new UpdateUserUseCase(this.userRepository);
    this.deleteUserUseCase = new DeleteUserUseCase(this.userRepository);
    
    // Initialize controllers
    this.userController = new UserController(
      this.createUserUseCase,
      this.getUserUseCase,
      this.getAllUsersUseCase,
      this.updateUserUseCase,
      this.deleteUserUseCase
    );
  }

  static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  async initialize(): Promise<void> {
    await this.database.connect();
  }

  async shutdown(): Promise<void> {
    await this.database.disconnect();
  }

  getUserController(): UserController {
    return this.userController;
  }
}