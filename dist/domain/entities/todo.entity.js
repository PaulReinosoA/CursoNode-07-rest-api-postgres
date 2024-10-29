"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoEntity = void 0;
class TodoEntity {
    constructor(id, text, completedAt) {
        this.id = id;
        this.text = text;
        this.completedAt = completedAt;
    }
    get isCompleted() {
        return !!this.completedAt;
    }
}
exports.TodoEntity = TodoEntity;
