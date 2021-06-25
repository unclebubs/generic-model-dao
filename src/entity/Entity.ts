export enum PublishedStatus {
    PUBLISHED = 'PUBLISHED',
    PENDING = 'PENDING',
    UNPUBLISHED = 'UNPUBLISHED'
}

export interface EntityInterface {
    id?: string | null,
    status?: PublishedStatus,
    order?: number,
    userId: string
}



export interface PersonInterface extends EntityInterface {
    name: string
}

export abstract class Entity implements EntityInterface {
    id = null
    status = PublishedStatus.UNPUBLISHED
    order = -1
    userId = '-1'

    constructor (params: EntityInterface) {
      Object.keys(this).forEach(key => { 
        if (params[key]) {
          this[key] = params[key]
        }
      })
    }


}


export class Person extends Entity implements PersonInterface {
    name= ''
    constructor (params: PersonInterface) {
      super(params)
      Object.keys(this).forEach(key => { 
        if (params[key]) {
          this[key] = params[key]
        }
      })

      //   Object.assign(this, params)
      console.log('this', this)
    }
}
