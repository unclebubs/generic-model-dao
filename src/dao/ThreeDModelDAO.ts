/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fbase from '../firebase/firebase'
import ThreeDModel from '../entity/ThreeDModel'
import AbstractFirebaseDAO from './AbstractFirebaseDAO'

export default class ThreeDModelDAO extends AbstractFirebaseDAO<ThreeDModel> {
  path = 'threeDModels'
  

  constructor () {
    super(fbase, ThreeDModel)
  }

  getRefFromEntity = (entity: ThreeDModel): string => {
    return `${this.path}/${entity.userId}/${entity.planId}/${entity.id}`
  }

  getNewEntityRef = (entity: ThreeDModel): string => {
    return `${this.path}/${entity.userId}/${entity.planId}/`
  }

  getRefFromParams = ({ id, uid, planId }: any): string => {
    try {
      return `${this.path}/${uid}/${planId}/${id}`
    } catch (error) {
      return error
    }
  }

  getAllEntitiesRef = ({ uid, planId }: any): string => {
    return `${this.path}/${uid}/${planId}`
  }
}
