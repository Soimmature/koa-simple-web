import { Context, Next } from 'koa'
import { HttpException } from '../exceptions/HttpException'
import { appConfig } from '../../config/app'

const catchError = async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (error) {
    const isHttpException = error instanceof HttpException
    const isDev = appConfig.environment === 'dev'

    if (isDev && !isHttpException) {
      throw error
    }

    if (isHttpException) {
      ctx.body = error.toJson()
      ctx.status = error.code
    } else {
      ctx.body = {
        msg: 'we made a mistake O(∩_∩)O~~',
        code: 500,
      }
      ctx.status = 500
    }
  }
}

export default catchError
