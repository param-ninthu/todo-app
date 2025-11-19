const { body, param } = require('express-validator');
const { VALIDATION } = require('../config/constants');
const mongoose = require('mongoose');

/**
 * Validation rules for creating a todo
 */
const createTodoValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: VALIDATION.TODO_TITLE_MIN, max: VALIDATION.TODO_TITLE_MAX })
    .withMessage(
      `Title must be between ${VALIDATION.TODO_TITLE_MIN} and ${VALIDATION.TODO_TITLE_MAX} characters`
    ),
  body('description')
    .optional()
    .trim()
    .isLength({ max: VALIDATION.TODO_DESCRIPTION_MAX })
    .withMessage(
      `Description cannot exceed ${VALIDATION.TODO_DESCRIPTION_MAX} characters`
    ),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom((value) => {
      if (!value.every(tag => typeof tag === 'string')) {
        throw new Error('All tags must be strings');
      }
      if (new Set(value).size !== value.length) {
        throw new Error('Duplicate tags are not allowed');
      }
      return true;
    }),
];

/**
 * Validation rules for updating a todo
 */
const updateTodoValidation = [
  param('id').custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid todo ID');
    }
    return true;
  }),
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ min: VALIDATION.TODO_TITLE_MIN, max: VALIDATION.TODO_TITLE_MAX })
    .withMessage(
      `Title must be between ${VALIDATION.TODO_TITLE_MIN} and ${VALIDATION.TODO_TITLE_MAX} characters`
    ),
  body('description')
    .optional()
    .trim()
    .isLength({ max: VALIDATION.TODO_DESCRIPTION_MAX })
    .withMessage(
      `Description cannot exceed ${VALIDATION.TODO_DESCRIPTION_MAX} characters`
    ),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom((value) => {
      if (!value.every(tag => typeof tag === 'string')) {
        throw new Error('All tags must be strings');
      }
      if (new Set(value).size !== value.length) {
        throw new Error('Duplicate tags are not allowed');
      }
      return true;
    }),
];

/**
 * Validation rules for todo ID parameter
 */
const todoIdValidation = [
  param('id').custom((value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('Invalid todo ID');
    }
    return true;
  }),
];

module.exports = {
  createTodoValidation,
  updateTodoValidation,
  todoIdValidation,
};