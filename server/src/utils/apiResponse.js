class ApiResponse {
    constructor(statusCode, data, message = 'Success') {
      this.success = statusCode < 400;
      this.statusCode = statusCode;
      this.message = message;
      this.data = data;
    }
  
 
    send(res) {
      return res.status(this.statusCode).json({
        success: this.success,
        message: this.message,
        data: this.data,
      });
    }
  
  
    static success(res, data, message = 'Success', statusCode = 200) {
      return new ApiResponse(statusCode, data, message).send(res);
    }
  
    static created(res, data, message = 'Created') {
      return new ApiResponse(201, data, message).send(res);
    }
  
    static noContent(res, message = 'No Content') {
      return res.status(204).json({
        success: true,
        message,
      });
    }
  }
  
  module.exports = ApiResponse;