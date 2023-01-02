class Model {
    constructor() {
      this.todos = [];
      this.filterTodos = [];
      this.count = 0;
      this.fetchAll();
    }
    async fetchAll() {
      let res = await fetch("http://localhost:3000/");
      let data = await res.json();
      this.todos = data.todos;
      this.count = data.count;
      this.todoListChanged(this.todos, this.count);
    }
  
    async   addTodo(todoText) {
      let body = {
        text: todoText,
      };
  
       const data= await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      this.fetchAll();
      //.then(() => this.fetchAll());
    }
  
     async deleteTodo(id) {
       const del= await fetch(`http://localhost:3000/delete/${id}`, {
        method: "POST",
      })
      this.fetchAll();
      // .then(() => {this.fetchAll();});
    }
  
     async toggleTodo(id, value) {
      let body = {
        checked: value,
      };
      
       const togg= await fetch(`http://localhost:3000/toggle/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      this.fetchAll();
      //.then(() => {this.fetchAll();});
    }
  
   async filterTodo(filter) {
      if (filter == "all") {
        this.filterTodos = this.todos;
      } else if (filter == "active") {
        this.filterTodos = this.todos.filter((todo) => !todo.isCompleted);
      } else if (filter == "completed") {
        this.filterTodos = this.todos.filter((todo) => todo.isCompleted);
      } else if (filter == "clearCompleted") {
       const filter=  await fetch("http://localhost:3000/deleteall/completed", {
          method: "POST",
        })
        this.fetchAll();
        //.then(() => {this.fetchAll();});
      }
  
      this.todoListChanged(this.filterTodos, this.count);
    }
  
    bindTodoListChanged(callback) {
      this.todoListChanged = callback;
    }
  }

class View
{
  constructor()
  {
    this.app=this.getElement("#root");
    this.container =this.createElement("div","div");
  
    this.list=this.createElement("div", "list");
    this.heading=this.createElement("p");
    this.heading.textContent='todos';
    this.heading.id="title";

    this.form=this.createElement("form","formClass");

    this.input=this.createElement("input");
    this.input.type='text';
    this.input.name="todo";
    this.input.placeholder="Write Something here";
    this.input.id="input";
    this.todoList=this.createElement("ul")
    this.footer=this.createElement("footer","buttons");
    this.form.append(this.input)

    this.major = this.createElement("div");

    this.major.append(this.form,this.todoList)

   
    this.container.append(this.heading, this.major)
    this.app.append(this.container);


//  Applying tailwind css
    this.app.classList.add("bg-gray-300",'h-96', 'max-w-full') 
    this.container.classList.add('flex','flex-col','h-40','w-2/5','text-center','m-auto')
    this.major.classList.add('bg-white','w-1/1')
    this.todoList.classList.add("min-w-full")
    this.heading.classList.add('text-white','text-center','text-8xl','justify-center','pb-6')
    this.input.classList.add("p-2",'border-2','min-w-full','px-6','py-2')

  }
 get _todoText()
 {
  return this.input.value;

 }
 _resetInput(){
  this.input.value="";
 }
  createElement(tag, className)
  {
    const element=document.createElement(tag)
    if(className) element.classList.add(className);
    return element
  }
  getElement(selector)
  {
    const element=document.querySelector(selector);
    return element;
  }


displayTodos(todos, count)
{
  while(this.todoList.firstChild)
  {
    this.todoList.removeChild(this.todoList.firstChild);
  }
  while(this.footer.firstChild)
  {
    this.footer.removeChild(this.footer.firstChild);
  }
  if(todos.length===0)
  {

  }
  else
  {
    todos.forEach( (todo)=>
    {
      const li=this.createElement("li");
      li.id=todo._id;
      const checkbox= this.createElement("input","checkbox");
      checkbox.type="checkbox"
      checkbox.checked=todo.isCompleted;
      const span=this.createElement("span");
      span.contentEditible=true;
      span.classList.add("text-left","editible");

      if (todo.isCompleted) {
        const strike = this.createElement("s");
        strike.textContent = todo.text;
        span.append(strike);
      } else {
        span.textContent = todo.text;
      }
      const deleteButton = this.createElement("button", "delete");
      deleteButton.textContent = "X";
      const left =this.createElement("left")
      left.append(checkbox,span)
      left.classList.add("flex",'justify-between','w-20');
      li.append(checkbox,span, deleteButton);
      this.todoList.append(li);
      //applying tailwind css
       li.classList.add('flex','justify-between','px-6','py-2','border-2','text-2xl');
    })

  }
  const itemsLeft = this.createElement("span");
  const temptodos = todos.filter((todo) => !todo.isCompleted);
  itemsLeft.textContent = temptodos.length + " items left";

  const filters = this.createElement("div");

  const all = this.createElement("button", "filter");
  all.textContent = "All";
  all.id = "all";

  const active = this.createElement("button", "filter");
  active.textContent = "Active";
  active.id = "active";

  const completed = this.createElement("button", "filter");
  completed.textContent = "Completed";
  completed.id = "completed";

  filters.append(all, active, completed);

  const clearCompleted = this.createElement("button", "filter");
  clearCompleted.textContent = "Clear Completed";
  clearCompleted.id = "clearCompleted";
  console.log(count);

  this.footer.append(itemsLeft, filters, clearCompleted);
  this.todoList.append(this.footer);
  this.footer.classList.add("flex",'justify-between','p-3')
  filters.classList.add("w-1/2",'flex', 'justify-around')

}
  bindAddTodo(handler)
  {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this._todoText) {
        handler(this._todoText);
        this._resetInput();
      }
    });
  }
  
  bindDeleteTodo(handler) 
    {
      
      this.todoList.addEventListener("click", (e) => {
       
        if (e.target.className === "delete") 
        {
          console.log(e.target.parentElement)
          const id = e.target.parentElement.id;
          handler(id);
        }
      });
    }
    bindToggleTodo(handler) 
    {
      this.todoList.addEventListener("click", (e) => {
        if (e.target.className === "checkbox") {
          const id = e.target.parentElement.id;
          
          handler(id, e.target.checked);
        }
      });
    }
    bindFilterTodos(handler) 
    {
      this.footer.addEventListener("click", (e) => {
        if (e.target.className === "filter") {
          handler(e.target.id);
        }
      });
    }
}

class Controller{
  constructor(model, view)
  {
    this.model=model;
    this.view=view;


    this.model.bindTodoListChanged(this.onTodoListChnaged);
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindToggleTodo(this.handleToggleTodo);
    this.view.bindFilterTodos(this.handleFilterTodo);
    this.model.bindTodoListChanged(this.todoListChanged);

  }
  todoListChanged=(todos, count) =>
  {
    this.view.displayTodos(todos, count);
  };
  handleAddTodo =(text)=>
  {
    this.model.addTodo(text);
  };
  handleDeleteTodo =(id, value) =>
  {
   
    this.model.deleteTodo(id, value);
  };
  handleToggleTodo=(id, value)=>
  {  
    this.model.toggleTodo(id, value);
  };
 handleFilterTodo =(filter) =>
 {
  this.model.filterTodo(filter);
 }
}
const app= new Controller(new Model(), new View());
  
  