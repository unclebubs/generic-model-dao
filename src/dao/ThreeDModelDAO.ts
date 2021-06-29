/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ThreeDModel from '../model/ThreeDModel'
import AbstractFirebaseDAO from './AbstractFirebaseDAO'


export default class ThreeDModelDAO extends AbstractFirebaseDAO<ThreeDModel> {
  path = 'threeDModels'

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(fbase: any, type: any) {
    super(fbase, type)
  }

   getRefFromEntity = (entity: ThreeDModel) : string => {
     return `${this.path}/${entity.userId}/${entity.planId}/${entity.id}`
   
   }

   getNewEntityRef = (entity: ThreeDModel) : string => {
     return `${this.path}/${entity.userId}/${entity.planId}/`
    
   }

 getRefFromParams =   ({id, uid, planId} : any) : string => {
   try {
     return `${this.path}/${uid}/${planId}/${id}`
   } catch (error) {
     return error
   }
 }

 getAllEntitiesRef = ({uid, planId}) : string => {
   return `${this.path}/${uid}/${planId}`
 }
}
