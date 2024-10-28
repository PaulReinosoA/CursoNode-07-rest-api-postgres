import { Router } from 'express';
import { TodoRoutes } from './todos/routes';

export class AppRoutes {
  constructor() {}

  static get routes(): Router {
    const router = Router();
    //const todosController = new TodosController();

    //solo envio la referencia de la funcion getTodos por que solo enviamos res y req 
    router.use('/api/todos',TodoRoutes.routes);

    return router;
  }
}
