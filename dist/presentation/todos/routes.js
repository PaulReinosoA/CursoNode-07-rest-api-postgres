"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
class TodoRoutes {
    constructor() { }
    static get routes() {
        const router = (0, express_1.Router)();
        const todosController = new controller_1.TodosController();
        //solo envio la referencia de la funcion getTodos por que solo enviamos res y req 
        router.get('/', (req, res) => todosController.getTodos(req, res));
        router.get('/:id', (req, res) => todosController.getTodoById(req, res));
        router.post('/', (req, res) => todosController.createTodo(req, res));
        router.put('/:id', (req, res) => todosController.updateTodo(req, res));
        router.delete('/:id', (req, res) => todosController.deleteTodo(req, res));
        return router;
    }
}
exports.TodoRoutes = TodoRoutes;
