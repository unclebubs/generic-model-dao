import { Entity, EntityInterface } from './Entity'

export interface IProduct extends EntityInterface {
   maxModels: number,
   maxUploadSize: number,
   productTypes: string[],
 }
 
class Product extends Entity implements IProduct {
  maxModels = 20
  maxUploadSize = 50
  productTypes = []

 
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor (params: any) {
    super(params)
    Object.keys(this).forEach((key) => {
      if (params[key]) {
        this[key as keyof this] = params[key]
      }
    })
  }
}
 
 
export default Product