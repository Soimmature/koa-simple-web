import { Middleware } from 'koa'
import { Methods } from './request'
import router from '../routes'
import {
  useMiddlewares,
  requestMethod,
  requestPath,
} from './metadata-key/common'

export function Controller(root?: string) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      // 请求路径
      const path = Reflect.getMetadata(requestPath, target.prototype, key)
      // 请求方法
      const method: Methods = Reflect.getMetadata(
        requestMethod,
        target.prototype,
        key
      )
      // 中间件
      const middlewares: Middleware[] = Reflect.getMetadata(
        useMiddlewares,
        target.prototype,
        key
      )
      // 绑定当前类得实例
      target.prototype[key].bind && target.prototype[key].bind(target)
      const handler = target.prototype[key]
      // 注册路由
      if (path && method) {
        const fullPath = root ? `${root}${path}` : path
        if (middlewares && middlewares.length) {
          router[method](fullPath, ...middlewares, handler)
        } else {
          router[method](fullPath, handler)
        }
      }
    }
  }
}
