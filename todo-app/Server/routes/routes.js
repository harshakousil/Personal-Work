const express = require("express");
const router = express.Router();

const Controller = require("../controllers/controller.js");

router.get("/", Controller.getTodos);

router.post("/add", Controller.addTodos);

router.post("/toggle/:id", Controller.toggleTodos);

router.post("/delete/:id", Controller.deleteTodos);

router.post("/deleteall/completed", Controller.clearCompleted);

module.exports = router;
