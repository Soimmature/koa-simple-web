import { CategoryRepository } from '@repository/CategoryRepository'
import { Controller, Get, Post, AutoRepository, api, Methods } from '@decorator'
import { Context } from 'koa'
import { getCustomRepository } from 'typeorm'
import { Category } from '@entity/Category'
import Validate, { TwinkleRequestContext } from '@validator/Request'
import CategorySaveRequest, {
  CategorySaveParams,
} from '@request/CategorySaveRequest'

@api.Api({ value: '分类', tags: ['分类的相关接口'], sort: 1 })
@Controller('/category')
class CategoryController {
  @AutoRepository(CategoryRepository)
  categoryRepository: CategoryRepository

  @api.ApiOperation({
    value: '获取分类列表',
    notes: '获取分类列表1',
    httpMethod: Methods.Get,
    sort: 1,
  })
  @api.ApiImplicitParams([
    new api.ApiImplicitItemParam({
      name: 'page',
      value: '页码',
      required: false,
      example: 1,
      type: 'number',
    }),
  ])
  @Get('/index')
  async index(ctx: Context) {
    const result = await this.categoryRepository.getChildren()
    return result
  }

  @Post('/save')
  @Validate(CategorySaveRequest)
  async save(
    ctx: TwinkleRequestContext<CategorySaveParams>
  ): Promise<Category> {
    const categoryRepository = getCustomRepository(CategoryRepository)

    const result = await categoryRepository.saveOne(ctx.validate.params)

    return result
  }
}
