export class UpdateTodoDto {
  private constructor(
    public readonly id?: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;
    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;
    let newCompletedAt;

    if (!id || isNaN(Number(id))) return ['id must be valid', undefined];

    if (completedAt) {
      if (new Date(completedAt).toString() === 'Invalid Date') {
        return ['CompletedAt must be valid'];
      }
      newCompletedAt = new Date(completedAt);
    }

    return [undefined, new UpdateTodoDto(id, text, newCompletedAt)];
  }
}
