const mongoose = require('mongoose');
const { VALIDATION } = require('../config/constants');

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [
        VALIDATION.TODO_TITLE_MIN,
        `Title must be at least ${VALIDATION.TODO_TITLE_MIN} character`,
      ],
      maxlength: [
        VALIDATION.TODO_TITLE_MAX,
        `Title cannot exceed ${VALIDATION.TODO_TITLE_MAX} characters`,
      ],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [
        VALIDATION.TODO_DESCRIPTION_MAX,
        `Description cannot exceed ${VALIDATION.TODO_DESCRIPTION_MAX} characters`,
      ],
      default: '',
    },
    done: {
      type: Boolean,
      default: false,
    },
    tags: {
        type: [String],
        default: [],
        validate: {
          validator: function (v) {
            return Array.isArray(v) && new Set(v).size === v.length;
          },
          message: 'Duplicate tags are not allowed',
        },
      },      
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


todoSchema.index({ done: 1 });
todoSchema.index({ createdAt: -1 });


todoSchema.methods.toggleDone = function () {
  this.done = !this.done;
  return this.save();
};


todoSchema.statics.getCompleted = function () {
  return this.find({ done: true }).sort({ updatedAt: -1 });
};

todoSchema.statics.getPending = function () {
  return this.find({ done: false }).sort({ createdAt: -1 });
};

/**
 * Pre-save middleware
 */
todoSchema.pre('save', function (next) {
  if (this.title) {
    this.title = this.title.trim();
  }
  if (this.description) {
    this.description = this.description.trim();
  }
  next();
});


 
const Todo = mongoose.model('Todo', todoSchema,'todo_list');

module.exports = Todo;