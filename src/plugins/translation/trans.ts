import * as resources from './resources'
import { CommonInput } from '@validator/TwinkleRequest'
/**
 * 翻译
 *
 * @param key
 * @param attr
 * @param params
 */
const trans = (key: string, attr: string, params: CommonInput): string => {
  let value: string
  if (Reflect.has(resources.zh, key)) {
    value = Reflect.get(resources.zh, key)
    value = value.replace(':attribute', attr)
    Object.keys(params).forEach((key) => {
      value = value.replace(`:${key}`, params[key])
    })
  } else {
    value = `${attr} ${key}`
    Object.keys(params).forEach((key) => {
      value += ` ${key}:${params[key]}`
    })
  }

  return value
}

export default trans
