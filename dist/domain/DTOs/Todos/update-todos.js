"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoDto = void 0;
class UpdateTodoDto {
    constructor(id, text, completedAt) {
        this.id = id;
        this.text = text;
        this.completedAt = completedAt;
    }
    get values() {
        const returnObj = {};
        if (this.text)
            returnObj.text = this.text;
        if (this.completedAt)
            returnObj.completedAt = this.completedAt;
        return returnObj;
    }
    static update(props) {
        const { id, text, completedAt } = props;
        let newCompletedAt;
        if (!id || isNaN(Number(id)))
            return ['id must be valid', undefined];
        if (completedAt) {
            if (new Date(completedAt).toString() === 'Invalid Date') {
                return ['CompletedAt must be valid'];
            }
            newCompletedAt = new Date(completedAt);
        }
        return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
    }
}
exports.UpdateTodoDto = UpdateTodoDto;
