
 //HTTP Status Codes

const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  };
  
  
  //Success messages
  
  const SUCCESS_MESSAGES = {
    TODO_CREATED: 'Todo created successfully',
    TODO_UPDATED: 'Todo updated successfully',
    TODO_DELETED: 'Todo deleted successfully',
    TODO_STATUS_UPDATED: 'Todo status updated successfully',
  };
  

  //Error messages
   
  const ERROR_MESSAGES = {
    TODO_NOT_FOUND: 'Todo not found',
    VALIDATION_ERROR: 'Validation error',
    INTERNAL_ERROR: 'Internal server error',
    INVALID_ID: 'Invalid ID format',
    ROUTE_NOT_FOUND: 'Route not found',
  };
  
  
   //Validation constraints
   
  const VALIDATION = {
    TODO_TITLE_MIN: 3,
    TODO_TITLE_MAX: 100,
    TODO_DESCRIPTION_MAX: 500,
  };
  
  module.exports = {
    HTTP_STATUS,
    SUCCESS_MESSAGES,
    ERROR_MESSAGES,
    VALIDATION,
  };