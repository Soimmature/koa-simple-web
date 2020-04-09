import { Next, Request, Response, Context } from 'koa'
import TwinkleRequest, { CommonInput } from './TwinkleRequest'
import { ParameterException } from '../../app/exceptions/HttpException'

export interface TwinkleRequestContext<T> extends Context {
  validate: {
    errors: string[]
    params: T
  }
}

export declare type ObjectType<T> = { new (): T }
/**
 *  验证器 (可用@Use中间件实现)
 *
 * @param TwinkleRequestClass
 */
const Validate = (TwinkleRequestClass: ObjectType<TwinkleRequest>) => {
  return (
    target: any,
    propertyName: string,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    let method = descriptor.value
    descriptor.value = function (ctx: Context) {
      const { request } = ctx
      const input: { [key: string]: any } = Object.assign(
        {},
        request.query,
        request.body
      )
      // ctx.request.query = { abc: 1122 }
      const twinkleRequest = new TwinkleRequestClass()
      twinkleRequest.validate(input)
      ctx.validate = {}
      ctx.validate.errors = twinkleRequest.getErrorMessages()
      if (twinkleRequest.isError && twinkleRequest.isThrow) {
        throw new ParameterException(ctx.validate.errors[0])
      }
      ctx.validate.params = twinkleRequest.getParams(input)

      return method.apply(this, arguments)
    }
  }
}

export default Validate
