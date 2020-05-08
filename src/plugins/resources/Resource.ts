export interface IResource {
  [key:string]: any
}

class Resource<T extends IResource> {
  [key:string]: any
  constructor(data: T) {
     this.init(data)
  }

  async init(data: T) {
    const result = await this.toArray(data)
    Object.keys(result).forEach(key => {
      this[key] = result[key]
    }) 
  }

  toArray(data:T) : IResource {
    return {}
  }

  static Collection<T>(list: T[]) {
    return list.map(item => {
      return new this<T>(item)
    })
  }
}

export default Resource