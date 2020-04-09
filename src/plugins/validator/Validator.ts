class Rule {
  name: string
  message: string
  params: any[]
  key: string
  constructor(name: string, key: string, message: string, params?: any[]) {
    this.name = name
    this.message = message
    this.params = params ? params : []
    this.key = key
  }
}

class Validator {
  intValidate() {
    // console.log('intValidate111')
    return false
  }

  betweenValidate(value: any, min: number, max: number) {
    // console.log('betweenValidate', value, min, max)
    return false
  }

  positiveIntegerValidate(value: any) {
    return value === undefined || /(^[1-9]\d*$)/.test(value)
  }
}

export default Validator

export { Rule }
