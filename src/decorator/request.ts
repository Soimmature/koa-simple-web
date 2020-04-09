import { Context } from 'koa'
import { requestPath, requestMethod } from './metadata-key/common'
export enum Methods {
  Get = 'get',
  Post = 'post',
}

function getRequestDecorator(type: Methods) {
  return function (path: string) {
    return function (
      target: any,
      key: string,
      descriptor: TypedPropertyDescriptor<any>
    ) {
      Reflect.defineMetadata(requestPath, path, target, key)
      Reflect.defineMetadata(requestMethod, type, target, key)
      let method = descriptor.value
      descriptor.value = async function (ctx: Context) {
        const result = await method.call(target, ctx)
        // 定义返回格式
        ctx.body = { data: result }
        return result
      }
    }
  }
}

export const Get = getRequestDecorator(Methods.Get)
export const Post = getRequestDecorator(Methods.Post)
