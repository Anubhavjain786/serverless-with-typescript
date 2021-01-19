export default class Response {
  static success(
    data: Record<string, any> | Array<any> | string | boolean,
    status = 200
  ) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        code: status,
        data: data,
      }),
    };
  }

  static noContent() {
    return {
      statusCode: 204,
      body: '',
    };
  }

  static error(error: Record<string, any> | string, status = 401) {
    let message = 'Something went wrong!';
    let errors = null;
    if (error instanceof Object) {
      message = error['message'];
      errors = error['errors'];
    } else {
      message = error;
    }
    return {
      statusCode: status,
      body: JSON.stringify({
        success: false,
        code: status,
        message: message,
        errors: errors,
      }),
    };
  }
}
