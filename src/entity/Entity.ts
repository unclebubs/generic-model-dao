export enum PublishedStatus {
  PUBLISHED = 'PUBLISHED',
  PENDING = 'PENDING',
  UNPUBLISHED = 'UNPUBLISHED'
}

export interface EntityInterface {
  id?: string | null;
  status?: PublishedStatus;
  order?: number;
  userId: string;
}

export abstract class Entity implements EntityInterface {
  id = null
  status = PublishedStatus.UNPUBLISHED
  order = -1
  userId = '-1'

  constructor (params: EntityInterface) {
    Object.keys(this).forEach((key: string) => {
      if (params[key]) {
        this[key as keyof this] = params[key]
      }
    })
  }
}
