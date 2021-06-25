/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import AbstractFirebaseDAO from './AbstractFirebaseDAO'
import { Person } from '../entity/Entity'

class PersonDAO extends AbstractFirebaseDAO<Person> {
   path = 'person'

   constructor(fbase: any) {
     super(fbase)
   }

   getRefFromEntity = (entity: Person) : string => {
     return `${this.path}/${entity.userId}/${entity.id}`
   
   }

   getNewEntityRef = (entity: Person) : string => {
     return `${this.path}/${entity.userId}/`
    
   }

 getRefFromParams =   ({id, uid}) : string => {
   try {
     return `${this.path}/${uid}/${id}`
   } catch (error) {
     return error
   }
 }

 getAllEntitiesRef = ({uid}) : string => {
   return `${this.path}/${uid}`
 }
 
}

export default PersonDAO