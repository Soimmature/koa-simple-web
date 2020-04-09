import Validator, { Rule } from './Validator'
import trans from '../translation/trans'

type TwinkleParams = {
  [key: string]: string[] | string
}

type TwinkleMessages = {
  [key: string]: string
}

type CommonInput = {
  [key: string]: any
}

abstract class TwinkleRequest {
  _rules: Rule[] = []

  _errors: Rule[] = []

  isFirst: boolean = true

  isThrow: boolean = true

  suffix: string = 'Validate'

  validator: Validator = new Validator()

  abstract rules(): TwinkleParams

  messages(): TwinkleMessages {
    return {}
  }

  get isError(): boolean {
    return this._errors.length > 0
  }

  getValidateName(name: string) {
    return `${name}${this.suffix}`
  }

  validate(input: CommonInput = {}): void {
    this.genRules()
    this._errors = []
    for (let i = 0; i < this._rules.length; i++) {
      const rule = this._rules[i]
      const method = this.getValidateName(rule.name)
      let func: Function = Reflect.get(this, method)

      if (!func && Reflect.has(this.validator, method)) {
        func = Reflect.get(this.validator, method)
      } else {
        throw Error(`No Validate for ${rule.name}`)
      }

      const success = func(input[rule.key], ...rule.params)
      if (!success) {
        if (!rule.message) {
          rule.message = trans(rule.name, rule.key, this.getTrans(func, rule))
        }

        this._errors.push(rule)
        if (this.isFirst) {
          break
        }
      }
    }
  }

  /**
   * 获取翻译
   *
   * @param func
   * @param rule
   */
  getTrans(func: Function, rule: Rule): CommonInput {
    const params = this.getParameterName(func).filter(
      (item) => item !== 'value'
    )

    if (params.length !== rule.params.length) {
      throw Error(`${rule.name} Validate Params length Error`)
    }
    const attrs: CommonInput = {}
    rule.params.forEach((item, index) => {
      attrs[params[index]] = item
    })

    return attrs
  }

  // 获取函数的参数名
  getParameterName(fn: Function): string[] {
    const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm
    const DEFAULT_PARAMS = /=[^,)]+/gm
    const FAT_ARROWS = /=>.*$/gm
    let code = fn.prototype
      ? fn.prototype.constructor.toString()
      : fn.toString()
    code = code
      .replace(COMMENTS, '')
      .replace(FAT_ARROWS, '')
      .replace(DEFAULT_PARAMS, '')
    let result = code
      .slice(code.indexOf('(') + 1, code.indexOf(')'))
      .match(/([^\s,]+)/g)
    return result === null ? [] : result
  }

  getParams(input: CommonInput = {}): CommonInput {
    const params: CommonInput = {}
    const rules = this.rules()
    Object.keys(input).forEach((param) => {
      if (Reflect.has(rules, param)) {
        params[param] = input[param]
      }
    })
    return params
  }

  getErrorMessages(): string[] {
    return this._errors.map((error) => {
      return error.message
    })
  }

  genRules() {
    const rules = this.rules()
    this._rules = []
    const ruleKeys = Object.keys(rules)
    for (let index = 0; index < ruleKeys.length; index++) {
      const ruleKey = ruleKeys[index]
      const values = rules[ruleKey]
      if (values instanceof Array) {
        for (let i = 0; i < values.length; i++) {
          const value = values[i]
          this._rules.push(this.setRule(value, ruleKey))
        }
      } else if (values) {
        this._rules.push(this.setRule(values, ruleKey))
      }
    }
  }

  setRule(value: string, ruleKey: string): Rule {
    const messages = this.messages()
    const params = value.split(':')
    const message =
      messages[`${ruleKey}.${params[0]}`] || messages[`${ruleKey}`]
    let rule: Rule
    if (params.length === 2) {
      // params[1].split(',')
      rule = new Rule(params[0], ruleKey, message, params[1].split(','))
    } else {
      rule = new Rule(params[0], ruleKey, message)
    }
    return rule
  }
}

export default TwinkleRequest

export { TwinkleMessages, TwinkleParams, CommonInput }
