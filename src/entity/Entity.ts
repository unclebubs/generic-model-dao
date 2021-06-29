export enum PublishedStatus {
  PUBLISHED = 'PUBLISHED',
  PENDING = 'PENDING',
  UNPUBLISHED = 'UNPUBLISHED'
}

export interface EntityInterface {
  _id?: string | null,
  _status?: PublishedStatus,
  _order?: number,
  _userId: string
}


export abstract class Entity implements EntityInterface {
  _id = null
  _status = PublishedStatus.UNPUBLISHED
  _order = -1
  _userId = '-1'

  constructor(params: EntityInterface) {
    Object.keys(this).forEach(key => {
      if (params[key]) {
        this[key] = params[key]
      }
    })
  }


}

