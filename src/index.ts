import 'reflect-metadata'
import Koa from 'koa'
import BodyParser from 'koa-bodyparser'
import router from './routes'

import { createConnection, Connection } from 'typeorm'
import { appConfig } from './config'
import catchError from './app/middleware/exception'
import { requireDirectory } from './utils/require-directory'
import path from 'path'
import { api } from './decorator'
import { Context } from 'koa'

const app = new Koa()
// 全局异常处理
app.use(catchError)
app.use(BodyParser())

createConnection().then(async (connection) => {
  // 加载控制器
  // TODO: 会使文件内路径别名失效
  requireDirectory(path.resolve(__dirname, './app/controller'))
  // api文档接口
  router.get('/docs', (ctx: Context) => {
    ctx.body = api.apiInstances()
  })
  app.use(router.routes()).use(router.allowedMethods())
  app.listen(appConfig.port, () => {
    console.log('server is running132')
  })
})
