import Resource, { IResource } from '@plugins/resources/Resource'
import { Category } from '@entity/Category'

export default class CategoryResource extends Resource<Category> {
  toArray(data: Category): IResource {
    // return new Promise(resolve => {
    //   resolve({
    //     id: data.id,
    //     name: data.name,
    //     children: CategoryResource.Collection(data.children)
    //   })
    // })
    return {
      id: data.id,
      name: data.name,
      children: CategoryResource.Collection(data.children),
    }
  }
}
