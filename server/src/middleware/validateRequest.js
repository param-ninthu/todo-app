const { validationResult } = require("express-validator");
const { HTTP_STATUS, ERROR_MESSAGES } = require("../config/constants");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
      value: error.value,
    }));

    return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
      success: false,
      error: ERROR_MESSAGES.VALIDATION_ERROR,
      details: formattedErrors,
    });
  }

  next();
};

module.exports = validateRequest;
