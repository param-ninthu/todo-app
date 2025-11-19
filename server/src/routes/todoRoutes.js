const express = require('express');
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodoDone,
  deleteTodo,
} = require('../controllers/todoController');
const {
  createTodoValidation,
  updateTodoValidation,
  todoIdValidation,
} = require('../validator/todoValidators');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

/**
 * @route   GET /api/v1/todos
 * @desc    Get all todos (with optional status filter)
 * @query   status: 'completed' | 'pending' | undefined
 */
router.get('/', getAllTodos);

/**
 * @route   GET /api/v1/todos/:id
 * @desc    Get single todo by ID
 */
router.get('/:id', todoIdValidation, validateRequest, getTodoById);

/**
 * @route   POST /api/v1/todos
 * @desc    Create new todo
 * @body    { title: string, description?: string, tags?: string[] }
 */
router.post('/', createTodoValidation, validateRequest, createTodo);

/**
 * @route   PUT /api/v1/todos/:id
 * @desc    Update todo (title, description, and/or tags)
 * @body    { title?: string, description?: string, tags?: string[] }
 */
router.put('/:id', updateTodoValidation, validateRequest, updateTodo);

/**
 * @route   PATCH /api/v1/todos/:id/done
 * @desc    Toggle todo done status
 */
router.patch('/:id/done', todoIdValidation, validateRequest, toggleTodoDone);

/**
 * @route   DELETE /api/v1/todos/:id
 * @desc    Delete todo
 */
router.delete('/:id', todoIdValidation, validateRequest, deleteTodo);

module.exports = router;