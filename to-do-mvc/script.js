class Model {
  constructor() {
    //this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.todos = [];
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  _commit(todos) {
    this.onTodoListChanged(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  addTodo(todoText) {
    const todo = {
      id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
      text: todoText,
      complete: false,
    };

    this.todos.push(todo);

    this._commit(this.todos);
  }

  editTodo(id, updatedText) {
    this.todos = this.todos.map((todo) =>
      todo.id === id
        ? { id: todo.id, text: updatedText, complete: todo.complete }
        : todo
    );

    this._commit(this.todos);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);

    this._commit(this.todos);
  }

  toggleTodo(id) {
    this.todos = this.todos.map((todo) =>
      todo.id === id
        ? { id: todo.id, text: todo.text, complete: !todo.complete }
        : todo
    );

    this._commit(this.todos);
  }
}

class View {
  constructor() {
    if (typeof window !== "undefined") {
      this.root = this.getElement("root");
      this.form = this.createElement("form");
      this.input = this.createElement("input");
      this.input.type = "text";
      this.input.placeholder = "what needs to be added ?";
      this.input.name = "todo";
      this.form.append(this.input);
      this.title = this.createElement("h1");
      this.title.textContent = "todos";
      this.todoList = this.createElement("ul", "todo-list");

      this.root.append(this.title, this.form, this.todoList);

      this._temporaryTodoText = "";
      this._initLocalListeners();
    }
  }

  get _todoText() {
    return this.input.value;
  }

  _resetInput() {
    this.input.value = "";
  }

  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    // console.log("." + selector);
    const element = document.getElementById(selector);

    return element;
  }

   displayTodos(todos) 
   
{

              if (typeof window !== "undefined") {
                while (this.todoList.firstChild) {
                  this.todoList.removeChild(this.todoList.firstChild);
                }
              } ;t

              // Show default message
              if (todos.length === 0) {
              } 
              else 
              {
                  todos.forEach((todo) => {
                  const li = this.createElement("li");
                  li.id = todo.id;

                  const checkbox = this.createElement("tc", "checkbox");
                  checkbox.type = "checkbox";
                  checkbox.checked = todo.complete;
                  const span = this.createElement("span");
                  span.contentEditable = true;
                  span.classList.add("editable");

                  if (todo.complete) {
                    const strike = this.createElement("s");
                    strike.textContent = todo.text;
                    span.append(strike);
                  } else {
                    span.textContent = todo.text;
                  }
                  const deleteButton = this.createElement("button", "delete");
                  deleteButton.textContent = "X";
                  li.append(checkbox, span, deleteButton);

                  this.todoList.append(li);
                });
              }
             
  
  }
  displaylast(todos)
  {
  if (todos.length > 0) 
  {

      const taskdetails = this.createElement("li", "li-class");

      const itemsleft = this.createElement("h5");
      itemsleft.textContent = "item left";

      const allButton = this.createElement("button");
      allButton.textContent = "All";
      allButton.addEventListener("click", function displayTodos(todos){
      });
      const activeButton = this.createElement("button");
      activeButton.textContent = "active";
      activeButton.addEventListener("click", function activeTodos(todos){
        console.log(todos.length);
      });

      const completeButton = this.createElement("button");
      completeButton.textContent = "Completed";
      const buttonelements = this.createElement("span", "buttonelements");
      buttonelements.append(allButton, activeButton, completeButton);
      const removetext = this.createElement("button", "removecompleted");
      removetext.textContent = "clear completed";

      taskdetails.append(itemsleft, buttonelements, removetext);
      this.todoList.append(taskdetails);
  }
}


  _initLocalListeners() {
    this.todoList.addEventListener("input", (event) => {
      if (event.target.className === "editable") {
        this._temporaryTodoText = event.target.innerText;
      }
    });
  }

  bindAddTodo(handler) {
    if (typeof window !== "undefined") {
      this.form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (this._todoText) {
          handler(this._todoText);
          this._resetInput();
        }
      });
    }
  }

  bindDeleteTodo(handler) {
    if (typeof window !== "undefined") {
      this.todoList.addEventListener("click", (event) => {
        if (event.target.className === "delete") {
          const id = parseInt(event.target.parentElement.id);
          handler(id);
        }
      });
    }
  }

  bindEditTodo(handler) {
    if (typeof window !== "undefined") {
      this.todoList.addEventListener("focusout", (event) => {
        if (this._temporaryTodoText) {
          const id = parseInt(event.target.parentElement.id);

          handler(id, this._temporaryTodoText);
          this._temporaryTodoText = "";
        }
      });
    }
  }

  bindToggleTodo(handler) {
    if (typeof window !== "undefined") {
      this.todoList.addEventListener("change", (event) => {
        if (event.target.type === "checkbox") {
          const id = parseInt(event.target.parentElement.id);

          handler(id);
        }
      });
    }
  }
  // bindallTodo(handler)
  // {
  //   if(typeof window !=="undefined")
  //   {
  //   allButton.addEventListener("click" ,() =>
  //     {
  //       handler(todos);
  //     });
  //   }
  // }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Explicit this bindingtmlbth
    this.model.bindTodoListChanged(this.onTodoListChanged);
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindEditTodo(this.handleEditTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);
    // this.view.bindallTodo(this.handleallTodo);

    // Display initial todos
    this.onTodoListChanged(this.model.todos);
  }

  onTodoListChanged = (todos) => {
    this.view.displayTodos(todos);
    // this.view.displaylast(todos);
    
  };

  handleAddTodo = (todoText) => {
    this.model.addTodo(todoText);
  };

  handleEditTodo = (id, todoText) => {
    this.model.editTodo(id, todoText);
  };

  handleDeleteTodo = (id) => {
    this.model.deleteTodo(id);
  };

  handleToggleTodo = (id) => {
    this.model.toggleTodo(id);
  };
  // handleallTodo =(todos) =>
  // {
  //   this.model.displayTodos(todos);
  // }
}
const app = new Controller(new Model(), new View());
