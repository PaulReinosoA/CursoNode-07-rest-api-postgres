"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const postgres_1 = require("../../data/postgres");
const DTOs_1 = require("../../domain/DTOs");
// const todos = [
//   { id: 1, text: 'buy milk', completedAt: new Date() },
//   { id: 2, text: 'buy bread', completedAt: null },
//   { id: 3, text: 'buy eggs', completedAt: new Date() },
// ];
class TodosController {
    //*DI
    constructor() {
        /**
         *   getTodos
         **/
        this.getTodos = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const todos = yield postgres_1.prisma.todo.findMany();
            return res.status(200).json(todos);
        });
        /**
         * getTodoById
         **/
        this.getTodoById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id; //el operdor =+ hace l conversion de string  entero por mi
            if (isNaN(id))
                return res.status(400).json({ errorMessage: `error with id: ${id}` });
            //const todo = todos.find((todo) => todo.id === id);
            const todo = yield postgres_1.prisma.todo.findFirst({
                where: {
                    // ... provide filter here
                    id,
                },
            });
            return todo
                ? res.status(200).json(todo)
                : res.status(404).json({ errorMessage: `error with id:${id} not found` });
        });
        /**
         *  createTodo
         **/
        this.createTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            //const { text } = req.body;
            const [error, createTodoDto] = DTOs_1.CreateTodoDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            if (!(createTodoDto === null || createTodoDto === void 0 ? void 0 : createTodoDto.text))
                return res.status(400).json({ errorMessage: `error text not found` });
            const todo = yield postgres_1.prisma.todo.create({ data: createTodoDto });
            // const newTodo = {
            //   id: todos.length + 1,
            //   text: text,
            //   completedAt: new Date(),
            // };
            //* todos.push(newTodo);
            return res.status(200).json(todo);
        });
        /**
         *   updateTodo
         **/
        this.updateTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id; //el operdor =+ hace l conversion de string  entero por mi
            // if (isNaN(id))
            //   return res.status(400).json({ errorMessage: `error with id: ${id}` });
            const [error, updateTodoDto] = DTOs_1.UpdateTodoDto.update(Object.assign(Object.assign({}, req.body), { id }));
            if (error)
                return res.status(400).json({ error });
            const todo = yield postgres_1.prisma.todo.findFirst({ where: { id } });
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
            const todoUpdated = yield postgres_1.prisma.todo.update({
                where: { id },
                data: updateTodoDto.values,
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
        });
        /**
         *   deleteTodo
         **/
        this.deleteTodo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = +req.params.id; //el operdor =+ hace l conversion de string  entero por mi
            if (isNaN(id))
                return res.status(400).json({ errorMessage: `error with id: ${id}` });
            //const todo = todos.find((todo) => todo.id === id);
            const todo = yield postgres_1.prisma.todo.findFirst({
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
            const DeleteTodo = yield postgres_1.prisma.todo.delete({
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
        });
    }
}
exports.TodosController = TodosController;
