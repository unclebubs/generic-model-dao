/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Entity, EntityInterface } from '../../entity/Entity'
import AbstractFirebaseDAO from '../AbstractFirebaseDAO'

export interface TestEntityInterface extends EntityInterface {
   stringTest: string
   falseTest: boolean
   trueTest: boolean
   numberTest: number
   arrayTest: string[]
   optionalTest? : string
 }

export class Test {
   name: string

   constructor(name: string) {
     this.name = name
   }
}
 
export class TestEntity extends Entity implements TestEntityInterface {
   stringTest= ''
   falseTest = false
   trueTest = true
   numberTest = 9
   arrayTest = ['a', 'b', 'c']
   constructor (params: TestEntityInterface) {
     super(params)
     Object.keys(this).forEach(key => { 
       if (params[key]) {
         this[key] = params[key]
       }
     })
   }
}

export class TestEntityDAO extends AbstractFirebaseDAO<TestEntity> {
   path = 'testentitites'

   constructor(fbase: any, type: any) {
     super(fbase, type)
   }

   getRefFromEntity = (entity: TestEntity) : string => {
     return `${this.path}/${entity.userId}/${entity.id}`
   
   }

   getNewEntityRef = (entity: TestEntity) : string => {
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

 