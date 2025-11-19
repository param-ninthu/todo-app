const Todo = require('../models/Todo');
const { asyncHandler, ApiError, ApiResponse } = require('../utils');
const {
  HTTP_STATUS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
} = require('../config/constants');

/**
 * @desc    Get all todos
 * @route   GET /api/v1/todos
 * @access  Public
 */
const getAllTodos = asyncHandler(async (req, res) => {
  const { status } = req.query;

  let query = {};

  if (status === 'completed') {
    query.done = true;
  } else if (status === 'pending') {
    query.done = false;
  }

  const todos = await Todo.find(query).sort({ createdAt: -1 });

  ApiResponse.success(res, { todos, count: todos.length }, 'Todos retrieved successfully');
});

/**
 * @desc    Get single todo by ID
 * @route   GET /api/v1/todos/:id
 * @access  Public
 */
const getTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw ApiError.notFound(ERROR_MESSAGES.TODO_NOT_FOUND);
  }

  ApiResponse.success(res, { todo }, 'Todo retrieved successfully');
});

/**
 * @desc    Create new todo
 * @route   POST /api/v1/todos
 * @access  Public
 */
const createTodo = asyncHandler(async (req, res) => {
  const { title, description , tags } = req.body;

  const todo = await Todo.create({
    title,
    description: description || '',
    tags: tags || [],
  });

  ApiResponse.created(res, { todo }, SUCCESS_MESSAGES.TODO_CREATED);
});

/**
 * @desc    Update todo
 * @route   PUT /api/v1/todos/:id
 * @access  Public
 */
const updateTodo = asyncHandler(async (req, res) => {
  const { title, description, tags } = req.body;

  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw ApiError.notFound(ERROR_MESSAGES.TODO_NOT_FOUND);
  }

  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (tags !== undefined) todo.tags = tags;

  await todo.save();

  ApiResponse.success(res, { todo }, SUCCESS_MESSAGES.TODO_UPDATED);
});

/**
 * @desc    Toggle todo done status
 * @route   PATCH /api/v1/todos/:id/done
 * @access  Public
 */
const toggleTodoDone = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw ApiError.notFound(ERROR_MESSAGES.TODO_NOT_FOUND);
  }

  todo.done = !todo.done;
  await todo.save();

  ApiResponse.success(res, { todo }, SUCCESS_MESSAGES.TODO_STATUS_UPDATED);
});

/**
 * @desc    Delete todo
 * @route   DELETE /api/v1/todos/:id
 * @access  Public
 */
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    throw ApiError.notFound(ERROR_MESSAGES.TODO_NOT_FOUND);
  }

  await todo.deleteOne();

  ApiResponse.success(res, { id: req.params.id }, SUCCESS_MESSAGES.TODO_DELETED);
});

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodoDone,
  deleteTodo,
};