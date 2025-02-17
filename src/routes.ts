import express from "express";
import { register, login, getUserTodos } from "./controllers/authController"; 
import { createTodo, getTodos, updateTodo, deleteTodo } from "./controllers/todoController";  

const router = express.Router();


router.post("/register", register); 
router.post("/login", login);        


router.post("/todos", createTodo);
router.get("/todos", getTodos);
router.put("/todos/:id", updateTodo);
router.delete("/todos/:id", deleteTodo);
router.get('/getUserTodos',getUserTodos)

export default router;