const express = require("express");
const router = express.Router();
const todoController = require("./controllers.js");

router.route("/").get(todoController.index).post(todoController.addTodo);

router
  .route("/:id")
  .delete(todoController.deleteTodo)
  .put(todoController.updateTodo);

module.exports = router;
