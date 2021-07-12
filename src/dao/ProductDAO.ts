/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fbase from '../firebase/firebase'
import Product from '../entity/Product'
import AbstractFirebaseDAO from './AbstractFirebaseDAO'

export default class ProductDAO extends AbstractFirebaseDAO<Product> {
  path = 'products'
  idTable = ''

  constructor () {
    super(fbase, Product)
  }


  getRefFromEntity = (entity: Product): string => {
    return `${this.path}/${entity.id}`
  }

  getNewEntityRef = (): string => {
    return `${this.path}/`
  }

  getRefFromParams = ({ id }: any): string => {
    try {
      return `${this.path}/${id}`
    } catch (error) {
      return error
    }
  }

  getAllEntitiesRef = (): string => {
    return `${this.path}/`
  }
}
