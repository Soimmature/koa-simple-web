import {
  Repository,
  getCustomRepository,
  getRepository,
  TreeRepository,
  Entity,
} from 'typeorm'
import 'reflect-metadata'
import { Context } from 'koa'
type RepositoryObjectType = { [key: string]: Function }
type AutoRepositoryType =
  | Function
  | Function[]
  | RepositoryObjectType
  | RepositoryObjectType[]
/// 废弃
export function AutoRepository(repositories: AutoRepositoryType) {
  return function (
    target: any,
    key: string,
    descriptor: TypedPropertyDescriptor<any>
  ) {
    const originRepositories =
      Reflect.getMetadata('repositories', target, key) || []
    if (repositories instanceof Function) {
      originRepositories.push({
        [genClassName(repositories)]: convertRepository(repositories),
      })
    } else if (repositories instanceof Array) {
      repositories.forEach((repository: Function | RepositoryObjectType) => {
        if (repository instanceof Function) {
          originRepositories.push({
            [genClassName(repository)]: convertRepository(repository),
          })
        } else {
          Object.keys(repository).forEach((item) => {
            originRepositories.push({
              [item]: convertRepository(repository[item]),
            })
          })
        }
      })
    }
    Reflect.defineMetadata('repositories', originRepositories, target, key)
    let method = descriptor.value
    descriptor.value = function (ctx: Context) {
      const allRepositories: RepositoryObjectType[] =
        Reflect.getMetadata('repositories', target, key) || []
      allRepositories.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (!ctx.repository) ctx.repository = {}
          ctx.repository[key] = item[key]
        })
      })
      return method.call(this, ctx)
    }
  }
}

function genClassName(func: Function) {
  let name: string = func.prototype.constructor.name

  return name.replace(name[0], name[0].toLowerCase())
}

function convertRepository(func: Function) {
  if (func.name.endsWith('Repository')) {
    return getCustomRepository(func)
  }
  return getRepository(func)
}
