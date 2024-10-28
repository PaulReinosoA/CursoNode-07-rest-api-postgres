import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/DTOs';

// const todos = [
//   { id: 1, text: 'buy milk', completedAt: new Date() },
//   { id: 2, text: 'buy bread', completedAt: null },
//   { id: 3, text: 'buy eggs', completedAt: new Date() },
// ];

export class TodosController {
  //*DI
  constructor() {}

  /**
   *   getTodos
   **/
  public getTodos = async (req: Request, res: Response): Promise<any> => {
    const todos = await prisma.todo.findMany();
    return res.status(200).json(todos);
  };

  /**
   * getTodoById
   **/
  public getTodoById = async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id; //el operdor =+ hace l conversion de string  entero por mi

    if (isNaN(id))
      return res.status(400).json({ errorMessage: `error with id: ${id}` });

    //const todo = todos.find((todo) => todo.id === id);
    const todo = await prisma.todo.findFirst({
      where: {
        // ... provide filter here
        id,
      },
    });

    return todo
      ? res.status(200).json(todo)
      : res.status(404).json({ errorMessage: `error with id:${id} not found` });
  };

  /**
   *  createTodo
   **/
  public createTodo = async (req: Request, res: Response): Promise<any> => {
    //const { text } = req.body;
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) return res.status(400).json({ error });

    if (!createTodoDto?.text)
      return res.status(400).json({ errorMessage: `error text not found` });

    const todo = await prisma.todo.create({ data: createTodoDto });

    // const newTodo = {
    //   id: todos.length + 1,
    //   text: text,
    //   completedAt: new Date(),
    // };

    //* todos.push(newTodo);
    return res.status(200).json(todo);
  };

  /**
   *   updateTodo
   **/
  public updateTodo = async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id; //el operdor =+ hace l conversion de string  entero por mi
    // if (isNaN(id))
    //   return res.status(400).json({ errorMessage: `error with id: ${id}` });
    const [error, updateTodoDto] = UpdateTodoDto.update({ ...req.body, id });

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.findFirst({ where: { id } });

    //const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      return res
        .status(404)
        .json({ errorMessage: `error todo not found, with id: ${id}` });

    //const { text, completedAt } = req.body;
    // if (!text || !completedAt)
    //   return res
    //     .status(400)
    //     .json({
    //       errorMessage: `error text not found: ${JSON.stringify(req.body)}`,
    // });

    //* ojo : los objetos en javascript se llaman por referencia asi que al editar este objeto actualizo la referencia a la lista de todos
    // esto no se recomienda pues no se deberia mutar asi la inf.
    // AQUI SI HAY VALOR ENTRANTE ACTUALIZALO SINO NO LO USES

    const todoUpdated = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
      /*
     data: {
        // ... provide data here
        text: text,
        completedAt:
          completedAt === 'null'
            ? null
            : new Date(completedAt || todo.completedAt),
      },
      */
    });

    /* 
    todo.text = text || todo.text;
    completedAt === 'null'
    ? (todo.completedAt = null)
    : (todo.completedAt = new Date(completedAt || todo.completedAt));
    */

    return res.status(200).json(todoUpdated);
  };

  /**
   *   deleteTodo
   **/
  public deleteTodo = async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id; //el operdor =+ hace l conversion de string  entero por mi
    if (isNaN(id))
      return res.status(400).json({ errorMessage: `error with id: ${id}` });

    //const todo = todos.find((todo) => todo.id === id);
    const todo = await prisma.todo.findFirst({
      where: {
        // ... provide filter here
        id,
      },
    });

    if (!todo)
      return res
        .status(404)
        .json({ errorMessage: `error todo not found, with id: ${id}` });

    //* todos.splice(todos.indexOf(todo), 1); //el filter tambien es una opcion
    const DeleteTodo = await prisma.todo.delete({
      where: {
        // ... filter to delete one Todo
        id,
      },
    });

    if (!DeleteTodo)
      return res
        .status(404)
        .json({ errorMessage: `error todo not deleted, with id: ${id}` });

    return res
      .status(200)
      .json({ DeleteTodo, message: `delete success elemente by id: ${id}` });
  };
}
