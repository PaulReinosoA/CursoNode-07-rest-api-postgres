"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const express_1 = require("express");
const routes_1 = require("./todos/routes");
class AppRoutes {
    constructor() { }
    static get routes() {
        const router = (0, express_1.Router)();
        //const todosController = new TodosController();
        //solo envio la referencia de la funcion getTodos por que solo enviamos res y req 
        router.use('/api/todos', routes_1.TodoRoutes.routes);
        return router;
    }
}
exports.AppRoutes = AppRoutes;
