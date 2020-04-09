import { EntityRepository, TreeRepository } from 'typeorm'
import { Category } from '../entity/Category'
import { CategorySaveParams } from '../app/request/CategorySaveRequest'

@EntityRepository(Category)
export class CategoryRepository extends TreeRepository<Category> {
  getChildren() {
    return this.findTrees()
  }

  async saveOne(params: CategorySaveParams) {
    const category = new Category()
    category.name = params.name
    category.description = params.description
    if (params.parentId) {
      const parent = await this.findOne(params.parentId)
      console.log('parent', parent)
      if (parent) category.parent = parent
    }
    return await this.save(category)
  }
}
