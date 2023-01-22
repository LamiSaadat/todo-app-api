const fs = require("fs");
const { v4: uuid } = require("uuid");
const todosFilePath = "./todos.json";

const getTodos = () => {
  return JSON.parse(fs.readFileSync(todosFilePath));
};

exports.index = (_req, res) => {
  let todos = getTodos();

  res.send(todos);
};

exports.addTodo = (req, res) => {
  let todos = getTodos();

  let newTodo = {
    id: uuid(),
    text: req.body.text,
    day: req.body.day,
    completed: req.body.completed,
  };

  todos.push(newTodo);

  fs.writeFileSync(todosFilePath, JSON.stringify(todos));

  res.send(todos);
};

exports.deleteTodo = (req, res) => {
  let todos = getTodos();

  const todoItemId = req.params.id;
  console.log(todoItemId);

  //check if todo item is in the file
  const foundTodoItem = todos.find((item) => {
    return item.id === todoItemId;
  });

  if (!foundTodoItem) {
    res.send("Item not found.");
  }

  //remove todo item from the list
  const filteredTodos = todos.filter((item) => item.id !== todoItemId);

  fs.writeFileSync(todosFilePath, JSON.stringify(filteredTodos));

  res.send(filteredTodos);
};

exports.updateTodo = (req, res) => {
  let todos = getTodos();

  let updatedItem = {
    id: req.params.id,
    text: req.body.text,
    day: req.body.day,
    completed: req.body.completed,
  };

  let updatedList = todos.map((item) => {
    if (item.id === updatedItem.id) {
      return (item = updatedItem);
    } else {
      return item;
    }
  });

  fs.writeFileSync(todosFilePath, JSON.stringify(updatedList));

  res.send(updatedList);
};
