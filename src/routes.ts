import express from "express";
import { register, login } from "./controllers/authController"; 
import { createTodo, getTodos, updateTodo, deleteTodo, getUserTodos } from "./controllers/todoController";  

const router = express.Router();


router.post("/register", register); 
router.post("/login", login);        


router.post("/todos/:userId", createTodo);
router.get("/todos", getTodos);
router.put("/todos/:userId/:todoId", updateTodo);
router.delete("/todos/:userId/:todoId", deleteTodo);
router.get('/getUserTodos/:userId',getUserTodos)

export default router;