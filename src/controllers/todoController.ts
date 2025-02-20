import { Request, Response } from "express";
import Todo from "../models/Todo";

export const createTodo = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params; 
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const newTodo = new Todo({
      title,
      user: userId, 
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
};


export const getTodos = async (_req: Request, res: Response) : Promise<any> =>{
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};


export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const { todoId } = req.params;
  const { completed } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate({ _id: todoId},

      { completed },
      { new: true }
    );

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};


export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const { todoId } = req.params;

  try {
    const todo = await Todo.findOneAndDelete({ _id: todoId});
    if (!todo) {
      res.status(400).json({ message: "Todo not found" });
      return;
    }
    res.status(200).json({status:true, message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};

export const getUserTodos = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const todos = await Todo.find({ user: userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};
