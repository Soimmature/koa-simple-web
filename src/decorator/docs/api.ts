import { Methods } from '../request'
// @Api(value = "首页", tags = {"首页展示的相关接口"},sort=1)
// @ApiOperation(value = "获取首页轮播图列表", notes = "获取首页轮播图列表", httpMethod = "GET",sort=1)
// @ApiImplicitParams({
//   @ApiImplicitParam(name = "catId", value = "三级分类id", required = true),
//   @ApiImplicitParam(name = "sort", value = "排序", required = false),
//   @ApiImplicitParam(name = "page", value = "查询下一页的第几页", required = false),
//   @ApiImplicitParam(name = "pageSize", value = "分页的每一页显示的条数", required = false)
// })
// @ApiResponses({
//   @ApiResponse(name = "catId", example = "三级分类id", required = true, type="int")
// })

type ApiInstance = {
  api: ApiParams
  operation: ApiOperationParams
  implicitParams?: ApiImplicitItemParam[]
  apiResponses?: ApiResponseParams[]
}
class ApiParams {
  value: string
  tags: string[]
  sort?: number

  constructor({ value, tags, sort = 99999 }: ApiParams) {
    this.value = value
    this.tags = tags
    this.sort = sort
  }
}

class ApiOperationParams {
  value: string
  notes: string
  sort?: number
  httpMethod: Methods

  constructor({
    value,
    notes,
    httpMethod = Methods.Get,
    sort = 99999,
  }: ApiOperationParams) {
    this.value = value
    this.notes = notes
    this.sort = sort
    this.httpMethod = httpMethod
  }
}
class ApiImplicitItemParam {
  name: string
  value: string
  required: boolean
  example?: any
  type: string

  constructor({
    name,
    value,
    required = true,
    example = '',
  }: ApiImplicitItemParam) {
    this.value = value
    this.name = name
    this.required = required
    this.example = example
  }
}
class ApiResponseParams {
  name: string
  value: string
  type: string

  constructor({ name, value, type }: ApiResponseParams) {
    this.value = value
    this.name = name
    this.type = type
  }
}
function getApisStorageInstance() {
  const apis: ApiInstance[] = []
  return (apiInstance?: ApiInstance): ApiInstance[] => {
    apiInstance && apis.push(apiInstance)
    return apis
  }
}

const apiInstances = getApisStorageInstance()
const ApiOperationParamsMate = Symbol('ApiOperation')
const ApiImplicitParamsMate = Symbol('ApiImplicitParams')
const ApiResponsesMate = Symbol('ApiResponses')

function Api(params: ApiParams) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      const apiOperationParams = Reflect.getMetadata(
        ApiOperationParamsMate,
        target.prototype,
        key
      )

      const apiImplicitParams = Reflect.getMetadata(
        ApiImplicitParamsMate,
        target.prototype,
        key
      )

      const apiResponseParams = Reflect.getMetadata(
        ApiResponsesMate,
        target.prototype,
        key
      )
      let apiInstance: ApiInstance
      if (apiOperationParams) {
        apiInstance = {
          api: params,
          operation: apiOperationParams,
        }
        if (apiImplicitParams) {
          apiInstance.implicitParams = apiImplicitParams
        }
        if (apiResponseParams) {
          apiInstance.apiResponses = apiResponseParams
        }
        apiInstances(apiInstance)
      }
    }
  }
}

function ApiOperation(params: ApiOperationParams) {
  return function (target: any, key: string) {
    Reflect.defineMetadata(ApiOperationParamsMate, params, target, key)
  }
}

function ApiImplicitParams(params: ApiImplicitItemParam[]) {
  return function (target: any, key: string) {
    Reflect.defineMetadata(ApiImplicitParamsMate, params, target, key)
  }
}
function ApiImplicitParam(params: ApiImplicitItemParam) {
  return function (target: any, key: string) {
    const originParams =
      Reflect.getMetadata(ApiImplicitParamsMate, target, key) || []

    originParams.push(params)

    Reflect.defineMetadata(ApiImplicitParamsMate, originParams, target, key)
  }
}
function ApiResponses(params: ApiResponseParams[]) {
  return function (target: any, key: string) {
    Reflect.defineMetadata(ApiResponsesMate, params, target, key)
  }
}

export {
  Api,
  ApiOperation,
  ApiImplicitParams,
  ApiImplicitParam,
  ApiResponses,
  ApiParams,
  ApiOperationParams,
  ApiImplicitItemParam,
  ApiResponseParams,
  apiInstances,
}
