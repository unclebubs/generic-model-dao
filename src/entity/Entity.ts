export enum PublishedStatus {
  PUBLISHED = 'PUBLISHED',
  PENDING = 'PENDING',
  UNPUBLISHED = 'UNPUBLISHED'
}

export interface EntityInterface {
  id?: string | null;
  referenceId?: string | null
  planId: string,
  name: string,
  description: string,
  status?: PublishedStatus;
  order?: number;
  userId: string;
}

export abstract class Entity implements EntityInterface {
  id = null
  referenceId = ''
  planId = ''
  name = ''
  description = ''
  status = PublishedStatus.UNPUBLISHED
  order = -1
  userId = '-1'

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor (params: any) {
    Object.keys(this).forEach((key: string) => {
      if (params[key]) {
        this[key as keyof this] = params[key]
      }
    })
  }
}
