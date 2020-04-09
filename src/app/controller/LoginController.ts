import { Next, Context, Request, Response } from 'koa'
import TestRequest, { RequestParams } from '../request/TestRequest'
import { Controller, Get, Use, Post } from '../../decorator'
import Validate, {
  TwinkleRequestContext,
} from '../../plugins/validator/Request'

const checkLogin = async (ctx: Context, next: Next) => {
  console.log('checkLogin')
  ctx.request.query = { id: 2 }
  await next()
}

@Controller('/auth')
class LoginController {
  @Get('/')
  @Use(checkLogin)
  home(ctx: Context) {
    console.log('query', ctx.request.query)
    console.log('body', ctx.request.body)
    ctx.body = '222'
  }

  @Validate(TestRequest)
  @Post('/login')
  login(ctx: TwinkleRequestContext<RequestParams>) {
    // console.log('query', ctx.request.query)
    // console.log('body', ctx.request.body)
    // console.log('validateParams', ctx.validate.params.a)
    // console.log('validateErrors', ctx.validate.errors)
    // console.log('input', Object.assign({}, ctx.request.query, ctx.request.body))
    // ctx.body = '222'
  }
}
