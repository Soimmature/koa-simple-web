import TwinkleRequest, {
  TwinkleParams,
} from '../../plugins/validator/TwinkleRequest'
export type CategorySaveParams = {
  name: string
  description: string
  parentId?: number
}

class CategorySaveRequest extends TwinkleRequest {
  rules(): TwinkleParams {
    return {
      name: '',
      description: '',
      parentId: 'positiveInteger',
    }
  }
}

export default CategorySaveRequest
