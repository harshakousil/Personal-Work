const ObjectId = require("mongodb").ObjectId;
const todo = require("../model/todo.js");
// getting intial todos whatever there in database.
exports.getTodos = async (req, res, next) => {
  //console.log("Hello in all")
  try {
    const data = await todo.find({});
    res.json(
      {
        todos: data,
        count: data.count
      });
  }
  catch (err) {
    next(err);
  }
}
// function to add a todo in the database uisng todo schema.
exports.addTodos = async (req, res, next) => {
  try {
    //console.log("Hello")
    const todo1 = req.body.text;
    const addtodo = new todo({ text: todo1, isCompleted: false });

    const data = await addtodo.save();
    res.status(200).json(data);
  }
  catch (err) {
    next(err);
  }
};

// function to delete a todo in the database using object id.
exports.deleteTodos = async (req, res, next) => {
  console.log(req.params.id)
  try {
    const id = ObjectId(req.params.id);
    const data = await todo.findByIdAndDelete(id);
    res.status(200).json(data)
  }
  catch (err) {
    next(err);
  }
};
// function to toogle te todos once they are completed.
exports.toggleTodos = async (req, res, next) => {
  // console.log("huuuu");
  try {
    var id = ObjectId(req.params.id);
    var isCompleted = req.body.checked;
    //isCompleted= !isCompleted;
    const data = await todo.findByIdAndUpdate(id, { isCompleted }, { new: true });
    res.status(200).json(data);
  }
  catch (err) {
    next(err)
  }
}

// fucntion to clear all the completed todos.
exports.clearCompleted = async (req, res, next) => {
  // console.log("Hello in clear");
  try {
    const data = await todo.deleteMany({ isCompleted: true });
    res.status(200).json(data)
  }
  catch (err) {
    next(err);
  }

};

// // export all  functions using module.exports keyword.
//  module.exports=getTodos;
//  module.exports=addTodos;
//  module.exports=deleteTodos;
//  module.exports=toggleTodos;
//  module.exports=clearCompleted;
