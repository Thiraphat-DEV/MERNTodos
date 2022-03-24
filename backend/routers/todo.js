import express from 'express'
//require
import { createTodo, deleteTodo, readTodos, updateTodo } from '../controller/todos.js'

const router = express.Router()
//home page showTodo
router.get('/', readTodos)
//write createTodo
router.post('/', createTodo)
// update todo
router.patch('/:id', updateTodo)
// delete todo
router.delete('/:id', deleteTodo)
export default router