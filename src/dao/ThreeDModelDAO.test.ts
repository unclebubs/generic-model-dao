
import {initializeTestApp} from '@firebase/rules-unit-testing'
import PublishedStatus from '../entity/PublishedStatus'
import ThreeDModel, {ARPlacment, ARScale, InteractionPrompt, IThreeDModel, Loading, Reveal} from '../entity/ThreeDModel'
import ThreeDModelDAO from './ThreeDModelDAO'



let testDAO : ThreeDModelDAO
let db
 
beforeAll(async () => {
  db = initializeTestApp({ databaseName: 'testdao', auth: {uid: 'craig'} })
  db.database().ref().set(null);
  testDAO = new ThreeDModelDAO()
  testDAO.firebase = db
})

afterEach(() => {
  db.database().ref().set(null);
})



const testData: IThreeDModel = {
  id: 'id1',
  status: PublishedStatus.UNPUBLISHED,
  referenceId: '',
  order: 87,
  planId: 'plan1',
  userId: 'craig',
  name: 'name1',
  description: 'descrption',
  _src: 'src1',
  _iosSrc: 'iossrc1',
  _skyboxImage: 'skyboxImage3',
  _poster: 'poster77',
  _hideFullScreenButton: true,
  _hideColorsButton: true,
  _exposure: 9,
  _shadowIntensity: 999,
  _shadowSoftness: 9999,
  _rotationPerSecond: 99999,
  _autoRotateDelay: 999999,
  _autoRotate: true,
  _cameraControls: true,
  _cameraOrbit: 'cameraOrbit4',
  _cameraTargetX: 9999999,
  _cameraTargetY: 99999999,
  _cameraTargetZ: 11,
  _useYawLimits: true,
  _yawMinLimit: 111,
  _yawMaxLimit: 1111,
  _usePitchLimits: true,
  _pitchMinLimit: 2,
  _pitchMaxLimit: 22,
  _radiusMinLimit: 222,
  _radiusMaxLimit: 2222,
  _minFieldOfView: 3,
  _maxFieldOfView: 33,
  _fieldOfView: 333,
  _ar: true,
  _arScale: ARScale.FIXED,
  _arPlacement: ARPlacment.WALL,
  _buttonColor: 'buttonColor4',
  _loading: Loading.EAGER,
  _reveal: Reveal.INTERACTION,
  _interactionPrompt: InteractionPrompt.NONE,
  buttonStates: {
    deleteButtonState: 'buttonStates',
    publishHotSpotButtonState: 'buttonStates2',
    publishButtonState: 'buttonStates3',
    unPublishButtonState: 'buttonStates4',
    revertChangesButtonState: 'buttonStates5',
  },
}



it('Test loadEntityFromReferenceID method', async () => {
  const entity = new ThreeDModel(testData)
  const savedEntity = await testDAO.saveEntity(entity)
  const loadedEntity = await testDAO.loadEntityFromReferenceID(savedEntity.referenceId, false)
  expect(loadedEntity.id).toBe(savedEntity.id)

  const loadedEntity2 = await testDAO.loadEntity({uid: savedEntity.userId, planId: savedEntity.planId, id:savedEntity.id}, false)
  expect(loadedEntity2.id).toBe(savedEntity.id)
})

it('Test get reference methods', async () => {
  const entity = new ThreeDModel(testData)
  const savedEntity = await testDAO.saveEntity(entity)
  const expectedRef = `${testDAO.path}/${savedEntity.userId}/${savedEntity.planId}/${savedEntity.id}`
  expect(testDAO.getRefFromEntity(savedEntity)).toBe(expectedRef)
  expect(testDAO.getRefFromParams({uid: savedEntity.userId ,planId: savedEntity.planId , id:savedEntity.id})).toBe(expectedRef)
  expect(testDAO.getNewEntityRef(new ThreeDModel(testData))).toBe(`${testDAO.path}/${savedEntity.userId}/${savedEntity.planId}/`)
  expect(testDAO.getAllEntitiesRef({uid: savedEntity.userId ,planId: savedEntity.planId})).toBe(`${testDAO.path}/${savedEntity.userId}/${savedEntity.planId}`)
  expect(await testDAO.getRefFromReferenceId(savedEntity.referenceId)).toBe(expectedRef)
})

it('Test saving of new Entity', async () => {
  const testEntity = new ThreeDModel(testData)
  const savedEntity = await testDAO.saveEntity(testEntity)
  for (const key in savedEntity) {
    if (key === 'id') {
      expect(savedEntity[key]).not.toBe(testData[key])
      expect(savedEntity).not.toBeNull()
    } else  if (key === 'referenceId') {
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
  await testDAO.saveEntity(testEntity)
  await testDAO.saveEntity(testEntity)
  await testDAO.saveEntity(testEntity)
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
  entity.name= 'Teste delete entity'
  const savedEntity = await testDAO.saveEntity(entity)
  await testDAO.publishEntity(savedEntity)
  await testDAO.deleteEntity(savedEntity)

  const unPublishedEntity = await testDAO.loadEntity({uid: 'craig', id: savedEntity.id}, false)
  const publishedEntity = await testDAO.loadEntity({uid: 'craig', id: savedEntity.id}, true)
  const ref = await testDAO.getRefFromReferenceId(savedEntity.referenceId)
  expect(ref).toBe('')
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
     
  