import { CreateUserUseCase, CreateUserDTO } from '../../domain/usecases/CreateUserUseCase';
import { GetUserUseCase } from '../../domain/usecases/GetUserUseCase';
import { GetAllUsersUseCase } from '../../domain/usecases/GetAllUsersUseCase';
import { UpdateUserUseCase, UpdateUserDTO } from '../../domain/usecases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../../domain/usecases/DeleteUserUseCase';
import { UserPresenter } from '../presenters/UserPresenter';

export interface Request {
  params?: any;
  body?: any;
}

export interface Response {
  status: number;
  data?: any;
  error?: any;
}

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase,
    private getAllUsersUseCase: GetAllUsersUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  async createUser(request: Request): Promise<Response> {
    try {
      const createUserDTO: CreateUserDTO = request.body;
      const user = await this.createUserUseCase.execute(createUserDTO);
      return {
        status: 201,
        data: UserPresenter.toViewModel(user)
      };
    } catch (error: any) {
      return {
        status: 400,
        error: UserPresenter.presentError(error)
      };
    }
  }

  async getUser(request: Request): Promise<Response> {
    try {
      const { id } = request.params;
      const user = await this.getUserUseCase.execute(id);
      return {
        status: 200,
        data: UserPresenter.toViewModel(user)
      };
    } catch (error: any) {
      return {
        status: 404,
        error: UserPresenter.presentError(error)
      };
    }
  }

  async getAllUsers(request: Request): Promise<Response> {
    try {
      const users = await this.getAllUsersUseCase.execute();
      return {
        status: 200,
        data: UserPresenter.toListViewModel(users)
      };
    } catch (error: any) {
      return {
        status: 500,
        error: UserPresenter.presentError(error)
      };
    }
  }

  async updateUser(request: Request): Promise<Response> {
    try {
      const { id } = request.params;
      const updateUserDTO: UpdateUserDTO = request.body;
      const user = await this.updateUserUseCase.execute(id, updateUserDTO);
      return {
        status: 200,
        data: UserPresenter.toViewModel(user)
      };
    } catch (error: any) {
      return {
        status: error.message === 'User not found' ? 404 : 400,
        error: UserPresenter.presentError(error)
      };
    }
  }

  async deleteUser(request: Request): Promise<Response> {
    try {
      const { id } = request.params;
      await this.deleteUserUseCase.execute(id);
      return {
        status: 204
      };
    } catch (error: any) {
      return {
        status: 404,
        error: UserPresenter.presentError(error)
      };
    }
  }
}