import TwinkleRequest, {
  TwinkleParams
} from '../../plugins/validator/TwinkleRequest'
export type RequestParams = {
  a: number
}

class TestRequest extends TwinkleRequest {
  rules(): TwinkleParams {
    return {
      a: ['between:1,2']
    }
  }
}

export default TestRequest
