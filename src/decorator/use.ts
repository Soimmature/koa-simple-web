import 'reflect-metadata'
import { Middleware } from 'koa'
import { useMiddlewares } from './metadata-key/common'

/**
 * 中间件
 *
 * @param middleware 中间件
 */
export function Use(middleware: Middleware) {
  return function (target: any, key: string) {
    const originMiddlewares =
      Reflect.getMetadata(useMiddlewares, target, key) || []
    originMiddlewares.unshift(middleware)
    Reflect.defineMetadata(useMiddlewares, originMiddlewares, target, key)
  }
}
