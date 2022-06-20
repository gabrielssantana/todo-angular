import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

const TODOS = "todos"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode = "list"
  public todos: Todo[] = []
  public title: string = "Minhas tarefas"
  public form: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ["", Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })
    this.loadDataFromLocalStorage()
  }

  doneTodo(todo: Todo) {
    todo.done = true
    todo.finishDate = new Date()
    this.saveLocalStorage()
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)
    if (index !== -1)
      this.todos.splice(index, 1)
    this.saveLocalStorage()
  }

  addTodo() {
    const name = this.form.controls.name.value
    const id = this.todos.length + 1
    this.todos.push(
      new Todo(
        id,
        name,
        new Date(),
        null,
        null,
        false
      )
    )
    this.saveLocalStorage()
    this.clearForm()
    this.changeMode("list")
  }

  clearForm() {
    this.form.reset()
  }

  saveLocalStorage() {
    const data = JSON.stringify(this.todos)
    localStorage.setItem(TODOS, data)
  }

  loadDataFromLocalStorage() {
    const localStorageData = localStorage.getItem(TODOS)
    if (localStorageData) {
      const todos = JSON.parse(localStorageData)
      this.todos = todos
    }
  }

  changeMode(mode: string) {
    this.mode = mode
  }
}
