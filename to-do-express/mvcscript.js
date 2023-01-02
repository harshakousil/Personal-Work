class Model {
  constructor() {
    this.todos = [];
  }
  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false,
    };
    this.todos.push(todo);
    // console.log(this.todos);
  }

  editTodo(id, updatedText) {
    this.todos = this.todos.map((todo) =>
      todo.id == id
        ? { id: todo.id, text: updatedText, complete: todo.complete }
        : todo
    );
  }
  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  toogleTodo(id) {
    this.todos = this.todos.map((todo) =>
      todo.id === id
        ? { id: todo.id, text: todo.text, complete: !todo.complete }
        : todo
    );
  }
}
class View {
  constructor() {
    // this.app = this.getElement("#root");
    this.title = this.createElement("h1");
    this.title.textContent = "todos";
    this.form = this.createElement("form");
    this.input = this.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "what needs to be done ?";
    this.input.name = "todo";
    this.submitButton = this.createElement("button");
    this.submitButton.textContent = "Submit";
    this.todoList = this.createElement("ul", "todo-list");
    // code to create all bottom part which consists of all task  details
    this.tasks_details = this.createElement("div");
    this.items_left = this.createElement("p");
    this.items_left.textContent = "item left";
    this.allButton = this.createElement("button");
    this.allButton.textContent = "All";

    this.activeButton = this.createElement("button");
    this.activeButton.textContent = "active";

    this.completeButton = this.createElement("button");
    this.completeButton.textContent = "Completed";
    this.this.tasks_details.append(
      this.items_left,
      this.allButton,
      this.activeButton,
      this.completeButton
    );
    this.this.form.append(this.input, this.submitButton);
    this.app.append(this.title, this.form, this.todoList, this.tasks_details);
  }
  createElement(tag, className) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }
  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }
  get _todoText() {
    return this.input.value;
  }

  _resetInput() {
    this.input.value = "";
  }
  displayTodos(todos) {
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    // Show default message
    if (todos.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Nothing to do! Add a task?";
      this.todoList.append(p);
    } else {
      todos.forEach((todo) => {
        const li = this.createElement("li");
        li.id = todo.id;

        // Each todo item will have a checkbox you can toggle
        const checkbox = this.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;

        // The todo item text will be in a contenteditable span
        const span = this.createElement("span");
        span.contentEditable = true;
        span.classList.add("editable");

        // If the todo is complete, it will have a strikethrough
        if (todo.complete) {
          const strike = this.createElement("s");
          strike.textContent = todo.text;
          span.append(strike);
        } else {
          // Otherwise just display the text
          span.textContent = todo.text;
        }

        // The todos will also have a delete button
        const deleteButton = this.createElement("button", "delete");
        deleteButton.textContent = "Delete";
        li.append(checkbox, span, deleteButton);

        // Append nodes to the todo list
        this.todoList.append(li);
      });
    }
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
}
const app = new Controller(new Model(), new View());
// app.model.addTodo("take a nap");
