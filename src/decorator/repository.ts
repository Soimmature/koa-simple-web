import { getRepository, getCustomRepository } from 'typeorm'
// 注册自定义repository
export function AutoRepository(repository: Function) {
  return function (target: any, propertyKey: string) {
    target[propertyKey] = getCustomRepository(repository)
  }
}
// 注册repository
export function AutoEntityRepository(entity: Function) {
  return function (target: any, propertyKey: string) {
    target[propertyKey] = getRepository(entity)
  }
}
