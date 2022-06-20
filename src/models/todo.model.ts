export class Todo {
  constructor(
    public id: number = 0,
    public name: string = '',
    public creationDate: Date = new Date(),
    public finishDate: Date | null = null,
    public deadLine: Date | null = null,
    public done: boolean = false
  ) { }
}
