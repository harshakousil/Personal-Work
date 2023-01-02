/**
 * @class Model
 *
 * Manages the data of the application.
 */
var checkbox;

class Model {
  constructor() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
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

/**
 * @class View
 *
 * Visual representation of the model.
 */
class View {
  constructor() {
    this.app = this.getElement("#root");
    this.form = this.createElement("form");
    this.input = this.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "What's need to be done?";
    this.input.name = "todo";
    this.input.className = "inp"
    this.submitButton = this.createElement("button");
    this.submitButton.textContent = "Submit";
    this.form.append(this.input);
    this.title = this.createElement("h1");
    this.title.textContent = "todos";
    this.todoList = this.createElement("ul", "todo-list");
    this.todoListAct = this.createElement("ul","actlist")
    this.app.append(this.title, this.form, this.todoList, this.todoListAct);

    this._temporaryTodoText = "";
    this._initLocalListeners();
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
    const element = document.querySelector(selector);

    return element;
  }

  displayTodos(todos) {
    // Delete all nodes
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    // Show default message
    if (todos.length === 0) {
      // const p = this.createElement("p");
      // p.textContent = "Nothing to do! Add a task?";
      // this.todoList.append(p);
    } else {
      // Create nodes
      todos.forEach((todo) => {
        const li = this.createElement("li");
        li.className = "tasks"
        li.id = todo.id;

        checkbox = this.createElement("input",'checkbox');
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

        // Append nodes
        this.todoList.append(li);
      });
      var down = this.createElement("li","li-class");
      var cou = this.Toogled(todos);
      down.innerText = todos.length-cou+" items left";
      var allbtn = this.createElement("button")
      allbtn.textContent="All"
      allbtn.addEventListener('click',(event)=>{
        
        this.displayTodos(todos)
      })
      var actbtn = this.createElement("button")
      actbtn.textContent="Active"
      actbtn.addEventListener('click',(event)=>{
        
        this.displayAct(todos)
      })
      var compbtn = this.createElement("button")
      compbtn.textContent="Completed"
      compbtn.addEventListener('click',(event)=>{
        
        this.displayComp(todos)
      })
      const buttonelements = this.createElement("span", "buttonelements");
      buttonelements.append(allbtn, actbtn, compbtn);
      down.append(buttonelements)
      this.todoList.append(down);  
    }

    // Debugging
    console.log(todos);
  }
  Toogled(todos) {
    var count =0;
    todos.forEach((todo) => {
      if (todo.complete) {
        count += 1;
      }
      
    });
    return count;
  }

  displayComp(todos){
    while (this.todoList.firstChild) {
        this.todoList.removeChild(this.todoList.firstChild);
      }
   todos.forEach((todo)=>{
    if(todo.complete){
        const li1 = this.createElement("li");
        li1.className = "tasks"
        li1.id = todo.id;

        checkbox = this.createElement("input",'checkbox');
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;
        console.log("nik")

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
        li1.append(checkbox, span, deleteButton);

        // Append nodes
        this.todoList.append(li1);

    }
   })
   var down = this.createElement("li","li-class");
      down.className="details"
      var cou = this.Toogled(todos);
      down.innerText = todos.length-cou+" items left";
      var allbtn = this.createElement("button")
      allbtn.textContent="All"
      allbtn.addEventListener('click',(event)=>{
        
        this.displayTodos(todos)
      })
      var actbtn = this.createElement("button")
      actbtn.textContent="Active"
      actbtn.addEventListener('click',(event)=>{
        
        this.displayAct(todos)
      })
      var compbtn = this.createElement("button")
      compbtn.textContent="Completed"
      compbtn.addEventListener('click',(event)=>{
        
        this.displayComp(todos)
      })
      const buttonelements = this.createElement("span", "buttonelements");
      buttonelements.append(allbtn, actbtn, compbtn);
      down.append(buttonelements)
      this.todoList.append(down);  
  }

  displayAct(todos){
    while (this.todoList.firstChild) {
        this.todoList.removeChild(this.todoList.firstChild);
      }
   todos.forEach((todo)=>{
    if(!todo.complete){
        const li1 = this.createElement("li");
        li1.className = "tasks"
        li1.id = todo.id;

        checkbox = this.createElement("input",'checkbox');
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;
        console.log("nik")

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
        li1.append(checkbox, span, deleteButton);

        // Append nodes
        this.todoList.append(li1);

    }
   })
   var down = this.createElement("li","li-class");
      down.className="details"
      var cou = this.Toogled(todos);
      down.innerText = todos.length-cou+" items left";
      var allbtn = this.createElement("button")
      allbtn.textContent="All"
      allbtn.addEventListener('click',(event)=>{
        
        this.displayTodos(todos)
      })
      var actbtn = this.createElement("button")
      actbtn.textContent="Active"
      actbtn.addEventListener('click',(event)=>{
        
        this.displayAct(todos)
      })
      var compbtn = this.createElement("button")
      compbtn.textContent="Completed"
      compbtn.addEventListener('click',(event)=>{
        
        this.displayComp(todos)
      })
      const buttonelements = this.createElement("span", "buttonelements");
      buttonelements.append(allbtn, actbtn, compbtn);
      down.append(buttonelements)
      this.todoList.append(down);  
  }

  _initLocalListeners() {
    this.todoList.addEventListener("input", (event) => {
      if (event.target.className === "editable") {
        this._temporaryTodoText = event.target.innerText;
      }
    });
  }

  bindAddTodo(handler) {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (this._todoText) {
        handler(this._todoText);
        this._resetInput();
      }
    });
  }

  bindDeleteTodo(handler) {
    this.todoList.addEventListener("click", (event) => {
      if (event.target.className === "delete") {
        const id = parseInt(event.target.parentElement.id);

        handler(id);
      }
    });
  }

  bindEditTodo(handler) {
    this.todoList.addEventListener("focusout", (event) => {
      if (this._temporaryTodoText) {
        const id = parseInt(event.target.parentElement.id);

        handler(id, this._temporaryTodoText);
        this._temporaryTodoText = "";
      }
    });
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener("change", (event) => {
      if (event.target.type === "checkbox") {
        const id = parseInt(event.target.parentElement.id);

        handler(id);
      }
    });
  }
}

/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // Explicit this binding
    this.model.bindTodoListChanged(this.onTodoListChanged);
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindEditTodo(this.handleEditTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);

    // Display initial todos
    this.onTodoListChanged(this.model.todos);
  }

  onTodoListChanged = (todos) => {
    
    this.view.displayTodos(todos);

  };

  handleAddTodo = (todoText) => {
    this.model.addTodo(todoText);
  };

  handleEditTodo = (id, todoText) => {
    this.model.editTodo(id, todoText);
  };

  handleDeleteTodo = (id) => {
    this.model.deleteTodo(id)
  };

  handleToggleTodo = (id) => {
    this.model.toggleTodo(id);
  };
}

const app = new Controller(new Model(), new View());

