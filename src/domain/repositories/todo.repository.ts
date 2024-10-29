import { CreateTodoDto, UpdateTodoDto } from '../DTOs';
import { TodoEntity } from '../entities/todo.entity';

export abstract class TodoRepository {
  abstract create(createTodoDto: CreateTodoDto): Promise<TodoEntity>;
  
  //Todo paginacion
  abstract getAll(): Promise<TodoEntity[]>;
  
  abstract findById(id:number): Promise<TodoEntity>;

  abstract updateTodoById(updateTodo:UpdateTodoDto): Promise<TodoEntity>;  

  abstract deleteTodoById(id:number): Promise<TodoEntity>;  
}
