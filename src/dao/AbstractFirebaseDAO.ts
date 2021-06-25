/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import firebase from './firebase'
import PublishedStatus from '../entity/PublishedStatus'
import { Entity } from '../entity/Entity'



export default abstract class AbstractFirebaseDAO<E extends Entity> {
   firebase: any = null
   type: any = null
   abstract  path: string

   constructor(fbase: any, type: {new (params: any) : E}) {
     this.firebase = fbase
     this.type = type
   }

   
   loadEntities = async ({ params, published = false, dispatch, dispatchEntitiesLoaded, dispatchEntityAdded, dispatchEntityUpdated, dispatchEntityRemoved }) => {
     const ref = this.getAllEntitiesRef(params)
     const requiredRef = ref + (published ? '/published' : '/pending')
     try {
       this.firebase
         .database()
         .ref(requiredRef)
         .orderByChild('order')
         .on('value', (snapshot) => {
           // console.log('got value ', snapshot.val())
           const entities: any = snapshot.val() ? Object.values(snapshot.val()) : []
           const typedEntities: E[] = entities.map(entity => new this.type(entity))
           dispatchEntitiesLoaded(dispatch, typedEntities)
         })

       this.firebase
         .database()
         .ref(requiredRef)
         .orderByChild('order')
         .on('child_added', (snapshot, previousKey) => {
           dispatchEntityAdded(dispatch, new this.type(snapshot.val()), previousKey)
         })
       this.firebase
         .database()
         .ref(requiredRef)
         .orderByChild('order')
         .on('child_changed', (snapshot, previousKey) => {
           // console.log('child_changed', snapshot.val())
           dispatchEntityUpdated(dispatch, new this.type(snapshot.val()), previousKey)
         })
       this.firebase
         .database()
         .ref(requiredRef)
         .orderByChild('order')
         .on('child_removed', snapshot => {
           // console.log('child_removed', snapshot.val())
           dispatchEntityRemoved(dispatch, new this.type(snapshot.val()))
         })
       this.firebase
         .database()
         .ref(requiredRef)
         .orderByChild('order')
         .on('child_moved', (snapshot, previousKey) => {
           // console.log('child_moved', snapshot.val())
           dispatchEntityUpdated(dispatch, new this.type(snapshot.val()), previousKey)
         })
       return true
     } catch (error) {
       console.log('Error while retrieving firebase entity', error)
       return error
     }
   }
    


    saveEntity = async (entity: E): Promise<E> => {
      const ref: string = this.getNewEntityRef(entity)
      const unPublishedRef = this.getRequiredRef(ref, false)
      return new Promise(async (resolve, reject) => {
        try {
          const pathRef =  this.firebase
            .database()
            .ref(unPublishedRef)
          const entityRef = pathRef.push()
          entity.id = entityRef.key
          entity.status = PublishedStatus.UNPUBLISHED
          // entity.buttonStates = null
          await entityRef.set(entity)
          resolve(entity)
        } catch (error) {
          console.log('Error saving firebase entity', error)
          reject(error)
        }
      })
    }

    async updateEntity (entity: E) : Promise<E> {
      const ref: string = this.getRefFromEntity(entity)
      const unPublishedRef = this.getRequiredRef(ref, false)
      const publishedRef = this.getRequiredRef(ref, true)
      return new Promise(async (resolve, reject) => {
        try {
          entity.status = PublishedStatus.PENDING
          // entity.buttonStates = null
          await this.firebase.database().ref(unPublishedRef).update(entity)
          // update the status in the published node to pending if mode exists
          await this.firebase.database().ref(publishedRef).once('value', async (snapshot) => {
            if (snapshot.exists()) {
              await this.firebase.database().ref(publishedRef).update({ status: PublishedStatus.PENDING })
            } else {
              throw new Error('Entity not in db')
            }
          })
          resolve(entity)
        } catch (error) {
          console.log('Error saving firebase entity', error)
          reject(error)
        }
      })
    }

   loadEntity = async(params : any,  published: boolean): Promise<E> => {
     const ref: string =  this.getRefFromParams(params)
     const requiredRef: string = this.getRequiredRef(ref, published)
     return new Promise(async (resolve, reject) => {
       try {
         this.firebase
           .database()
           .ref(requiredRef)
           .once('value')
           .then(snapshot => {
             resolve(snapshot.val())
           })
       } catch (error) {
         console.log('Error while retrieving firebase entity', error)
         reject(error)
       }
     })

   }

   //    const instatiate<E extends Entity>(type: { new(): E ;}, data: EntityInterface ): E  => {
   //     return new type(data);
   // }

   loadAllEntities = async (params: any, published = true) => {
     try {
       const ref: string =  this.getAllEntitiesRef(params)
       const requiredRef = ref + (published ? '/published' : '/pending')   
       const snapshot = await  this.firebase.database().ref(requiredRef).once('value')
       const data: any = Object.values(snapshot.val())
       const typedObjects: E = data.map(o => new this.type(o))
       return Object.values(typedObjects)

       //  throw new Error('Nothing found')
      
     } catch (error) {
       console.log('Error in loadAllEntities', error)
       return error
     }
   }

    publishEntity = async (entity: E) : Promise<boolean> => {
      const ref: string = this.getRefFromEntity(entity)
      const unPublishedRef = this.getRequiredRef(ref, false)
      const publishedRef = this.getRequiredRef(ref, true)
      return new Promise(async (resolve, reject) => {
        try {
          const unPublishedData = await this.firebase.database().ref(unPublishedRef).once('value')
          if (unPublishedData.val()) {
            await this.firebase.database().ref(publishedRef).set({ ...unPublishedData.val(), status: PublishedStatus.PUBLISHED })
            await this.firebase.database().ref(unPublishedRef).update({ status: PublishedStatus.PUBLISHED })
          }
          resolve(true)
        } catch (error) {
          console.log('Error caught in FirebaseDAO@publishEntity', error)
          reject(error)
        }
      })
    }

     unPublishEntity = async (entity: E) : Promise<boolean> => {
       const ref: string = this.getRefFromEntity(entity)
       const unPublishedRef = this.getRequiredRef(ref, false)
       const publishedRef = this.getRequiredRef(ref, true)
       return new Promise(async (resolve, reject) => {
         try {
           await this.firebase.database().ref(publishedRef).remove()
           await this.firebase.database().ref(unPublishedRef).update({ status: PublishedStatus.UNPUBLISHED })
           resolve(true)
         } catch (error) {
           console.log('Error caught in FirebaseDAO@unPublishEntity', error)
           reject(error)
         }
       })
     }

    revertEntityChanges = async (entity: E) : Promise<boolean> => {
      const ref: string = this.getRefFromEntity(entity)
      const unPublishedRef = this.getRequiredRef(ref, false)
      const publishedRef = this.getRequiredRef(ref, true)
      return new Promise(async (resolve, reject) => {
        try {
          const publishedData = await this.firebase.database().ref(publishedRef).once('value')
          if (publishedData.val()) {
            await this.firebase.database().ref(unPublishedRef).update({ ...publishedData.val(), status: PublishedStatus.PUBLISHED })
            await this.firebase.database().ref(publishedRef).update({ status: PublishedStatus.PUBLISHED })
          }
          resolve(true)
        } catch (error) {
          console.log('unable to revertEntityChanges', error)
          reject(error)
        }
      })
    }

     deleteEntity = async (entity: E) : Promise<boolean> => {
       try {
         const ref = this.getRefFromEntity(entity)
         const unPublishedRef = this.getRequiredRef(ref, false)
         const publishedRef = this.getRequiredRef(ref, true)
         // ensure ref doesn't end in published || pending
         if (!unPublishedRef.endsWith('pending/') && !publishedRef.endsWith('published/')) {
           
           
           await this.firebase.database().ref(unPublishedRef).remove()
           await this.firebase.database().ref(publishedRef).remove()
           return true

         }

       } catch (error) {
         console.log('Error in deleteEntity', error)
         return error
       }

       return false
     }


  

   getPendingRef = (ref: string ) : string => {
     return ref.substring(0, ref.lastIndexOf('/')) + '/pending' + ref.substring(ref.lastIndexOf('/'))
   }

  getPublishedRef = (ref: string) : string => {
    return ref.substring(0, ref.lastIndexOf('/')) + '/published' + ref.substring(ref.lastIndexOf('/'))
  }

  getRequiredRef = (ref: string, published = true) : string => {
    return published ? this.getPublishedRef(ref) : this.getPendingRef(ref)
  }

  getCurrentUserId = async () : Promise<string> => {
    try {
      return 'zaJbATKfpXToPLTjmARndxoUHo63'
      // const {currentUser } =  await this.firebase.auth()
      // return currentUser.uid
    } catch (error) {
      console.log('Caught error getting user')
      return error
    }
  }

  abstract getRefFromEntity(entity:  E) : string;

  abstract getRefFromParams(params: any) : string

  abstract getNewEntityRef(entity: E) : string

  abstract getAllEntitiesRef(params: any) : string
}