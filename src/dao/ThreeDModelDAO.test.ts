
import {initializeTestApp} from '@firebase/rules-unit-testing'
import PublishedStatus from '../entity/PublishedStatus'
import ThreeDModel, {IThreeDModel} from '../entity/ThreeDModel'
import ThreeDModelDAO from './ThreeDModelDAO'



let testDAO
let db

 
beforeAll(async () => {
  db = initializeTestApp({ databaseName: 'testdao', auth: {uid: 'craig'} })
  db.database().ref().set(null);
  testDAO = new ThreeDModelDAO(db, ThreeDModel)
})

afterAll(() => {
  db.database().ref().set(null);
})



const testData: IThreeDModel = {
  id: 'id1',
  status: PublishedStatus.UNPUBLISHED,
  order: 87,
  planId: 'plan1',
  userId: 'craig',
  _name: 'name1',
  description: 'descrption',
  src: 'src1',
  iosSrc: 'iossrc1',
  skyboxImage: 'skyboxImage3',
  poster: 'poster77',
  hideFullScreenButton: true,
  hideColorsButton: true,
  exposure: 9,
  shadowIntensity: 999,
  shadowSoftness: 9999,
  rotationPerSecond: 99999,
  autoRotateDelay: 999999,
  autoRotate: true,
  cameraControls: true,
  cameraOrbit: 'cameraOrbit4',
  cameraTargetX: 9999999,
  cameraTargetY: 99999999,
  cameraTargetZ: 11,
  useYawLimits: true,
  yawMinLimit: 111,
  yawMaxLimit: 1111,
  usePitchLimits: true,
  pitchMinLimit: 2,
  pitchMaxLimit: 22,
  radiusMinLimit: 222,
  radiusMaxLimit: 2222,
  minFieldOfView: 3,
  maxFieldOfView: 33,
  fieldOfView: 333,
  ar: true,
  arScale: 'arScale.3',
  arPlacement: 'arPlacement2',
  buttonColor: 'buttonColor4',
  loading: 'loading3',
  reveal: 'reveal4',
  interactionPrompt: 'interactionPrompt1',
  buttonStates: {
    deleteButtonState: 'buttonStates',
    publishHotSpotButtonState: 'buttonStates2',
    publishButtonState: 'buttonStates3',
    unPublishButtonState: 'buttonStates4',
    revertChangesButtonState: 'buttonStates5',
  },
}

it('Test saving of new Entity', async () => {
  const testEntity = new ThreeDModel(testData)
  const savedEntity = await testDAO.saveEntity(testEntity, ThreeDModel)
  for (const key in savedEntity) {
    if (key === 'id') {
      expect(savedEntity[key]).not.toBe(testData[key])
      expect(savedEntity).not.toBeNull()
    } else {
      expect(savedEntity[key]).toBe(testData[key])
    }
  }
  expect(savedEntity instanceof ThreeDModel).toBe(true)
})

it('Test loading all entities', async () => {
  const testEntity = new ThreeDModel(testData)
  await testDAO.saveEntity(testEntity, ThreeDModel)
  await testDAO.saveEntity(testEntity, ThreeDModel)
  const savedEntities = await testDAO.loadAllEntities({uid: 'craig', planId: 'plan1'}, false)
  savedEntities.forEach(element => {
    expect(element instanceof ThreeDModel).toBe(true)
  });
  expect(savedEntities.length).toBe(3)
})

it('Test publishing and unpublishing an entity', async () => {
  const entity = new ThreeDModel(testData)
  const savedEntity = await testDAO.saveEntity(entity)
  const published = await testDAO.publishEntity(savedEntity)
  const publishedE = await testDAO.loadEntity({id: entity.id, uid: 'craig', planId: 'plan1'}, true)

  //ensure published and status updated
  expect(published).toBeTruthy()
  expect(publishedE.status).toBe(PublishedStatus.PUBLISHED)

  const unPublished = await testDAO.unPublishEntity(savedEntity)
  const unPublishedE = await testDAO.loadEntity({id: entity.id, uid: 'craig', planId: 'plan1'}, false)
  expect(unPublished).toBeTruthy()
  expect(unPublishedE.status).toBe(PublishedStatus.UNPUBLISHED)
})

it('Test reverting an entity', async () => {
  const oldValue = 'x'
  const newValue = 'x'
  const entity = new ThreeDModel(testData)
  entity.name = oldValue
  const savedEntity = await testDAO.saveEntity(entity)
  const published = await testDAO.publishEntity(savedEntity)
  expect(published).toBeTruthy()
  savedEntity.name=newValue
  const updatedEntity = await testDAO.updateEntity(savedEntity)
  expect(updatedEntity.name).toBe(newValue)
  const reverted = await testDAO.revertEntityChanges(updatedEntity)
  expect(reverted).toBeTruthy()
  const revertedEntity = await testDAO.loadEntity({id:savedEntity.id , uid: 'craig', planId: 'plan1'}, false)
  expect(revertedEntity.name).toBe(oldValue)
        
})

it('Test deleteing an entity', async () => {
  const entity = new ThreeDModel(testData)
  const savedEntity = await testDAO.saveEntity(entity)
  await testDAO.publishEntity(savedEntity)
  await testDAO.deleteEntity(savedEntity)

  const unPublishedEntity = await testDAO.loadEntity({uid: 'craig', id: savedEntity.id}, false)
  const publishedEntity = await testDAO.loadEntity({uid: 'craig', id: savedEntity.id}, true)
  expect(unPublishedEntity).toBeNull()
  expect(publishedEntity).toBeNull()    
})

     
// //Todo implement testing for callbacks
// it('Test loadEntities', async () => {
//   db.database().ref().set(null);
//   const entity = new ThreeDModel(testData)
//   await testDAO.saveEntity(entity)
//   await testDAO.saveEntity(entity)
//   await testDAO.saveEntity(entity)
//   const dummyDispatch = 'dummy'

//   const dispatchEntitiesLoaded = (dispatch, entities) => {
//     dispatchEntitiesLoadedExecuted = true
//     expect(entities.length).toBe(3)
//     expect(dispatch).toBe(dummyDispatch)
//   } 
//   const dispatchEntityAdded = (dispatch, entity, previouskey) => {
//     expect(entity).toBeDefined()
//     expect(previouskey).toBeDefined()
//     expect(dispatch).toBe(dummyDispatch)
//   } 
//   const dispatchEntityUpdated = (dispatch, entity, previouskey) => {
//     expect(entity).toBeDefined()
//     expect(previouskey).toBeDefined()
//     expect(dispatch).toBe(dummyDispatch)
//   } 
//   const dispatchEntityRemoved  = (dispatch, entity) => {
//     expect(entity).toBeDefined()
//     expect(dispatch).toBe(dummyDispatch)
//   } 

//   const executed = await testDAO.loadEntities({
//     params: {uid: 'craig'},
//     published: false,
//     dispatch: dummyDispatch,
//     dispatchEntitiesLoaded,
//     dispatchEntityAdded,
//     dispatchEntityRemoved,
//     dispatchEntityUpdated,
//   })

//   expect(executed).toBeTruthy()
        
  
// })
     
  