class HttpException extends Error {
  code: number
  msg: string
  constructor(msg: string = '服务器异常', code: number = 400) {
    super()
    this.code = code
    this.msg = msg
    // Set the prototype explicitly
    Object.setPrototypeOf(this, HttpException.prototype)
  }

  toJson() {
    return {
      code: this.code,
      msg: this.msg,
    }
  }
}

class ParameterException extends HttpException {
  constructor(msg: string) {
    super()
    this.code = 422
    this.msg = msg || '参数错误'
  }
}

class Success extends HttpException {
  constructor(msg: string) {
    super()
    this.code = 200
    this.msg = msg || 'ok'
  }
}

class NotFound extends HttpException {
  constructor(msg: string) {
    super()
    this.msg = msg || '资源未找到'
    this.code = 404
  }
}

class AuthFailed extends HttpException {
  constructor(msg: string) {
    super()
    this.msg = msg || '授权失败'
    this.code = 401
  }
}

class Forbidden extends HttpException {
  constructor(msg: string) {
    super()
    this.msg = msg || '禁止访问'
    this.code = 403
  }
}

export {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbidden,
}
