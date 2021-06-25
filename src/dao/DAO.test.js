// import configureMockStore from 'redux-mock-store'
// import thunk from 'redux-thunk'
// import * as actions from './AssetManagerActions'
// import * as types from './Types'
// import testImage from '../test/tester.jpg'
// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)


import {assertFails, initializeTestApp} from '@firebase/rules-unit-testing'
import PublishedStatus from '../entity/PublishedStatus'
import { TestEntity, TestEntityDAO } from './test/TestEntities'



let testDAO = null
let db  = null

 
beforeAll(async () => {
  db = initializeTestApp({ databaseName: 'testdao', auth: {uid: 'craig'} })
  // await loadDatabaseRules({
  //   databaseName: 'my-database',
  //   rules: '{\'rules\': {\'.read\': true, \'.write\': true}}',
  // });
  db.database().ref().set(null);
  testDAO = new TestEntityDAO(db, TestEntity)
})

afterAll(() => {
   db.database().ref().set(null);
})



const testData = {userId: 'craig', stringTest: 'x', falseTest: false, trueTest: true, numberTest: 9, arrayTest:['a', 'b', 'c']}

it('Test saving of new Entity', async () => {
  const testEntity = new TestEntity(testData)
  const savedEntity = await testDAO.saveEntity(testEntity, TestEntity)
  expect(savedEntity.userId).toBe(testData.userId)
  expect(savedEntity.stringTest).toBe(testData.stringTest)
  expect(savedEntity.falseTest).toBe(false)
  expect(savedEntity.trueTest).toBe(true)
  expect(savedEntity.numberTest).toBe(testData.numberTest)
  expect(savedEntity.arrayTest).toBe(testData.arrayTest)
  expect(savedEntity.id).toBeDefined()
  expect(savedEntity instanceof TestEntity).toBe(true)
})

it('Test loading all entities', async () => {
  const testEntity = new TestEntity(testData)
  await testDAO.saveEntity(testEntity, TestEntity)
  await testDAO.saveEntity(testEntity, TestEntity)
  const savedEntities = await testDAO.loadAllEntities({uid: 'craig'}, false)
  savedEntities.forEach(element => {
      expect(element instanceof TestEntity).toBe(true)
  });
  expect(savedEntities.length).toBe(3)
  })

  // it('Test update an entity', async () => {
   
  //   const savedEntities = await testDAO.loadAllEntities({uid: 'craig'}, false)
  //   const lastEntity = savedEntities.pop()
  //   lastEntity.name = lastEntity.name + '_x'
  //   lastEntity.status = PublishedStatus.PUBLISHED
  //   const savedEntity = await testDAO.updateEntity(lastEntity)

  //   expect(savedEntity.name).toBe(lastEntity.name)
  //   expect(savedEntity.status).toBe(PublishedStatus.PENDING)
  //   })

    // it('Test update an entity not in db', async () => {
   
    //   const entityReject = new TestEntity(testData)
      
    //   try {
    //   await testDAO.updateEntity(entityReject)
    //   } catch (error) {
    //   expect(true).toBeTruthy()
    //   }
      
    //   })

      it('Test publishing and unpublishing an entity', async () => {
        const entity = new TestEntity(testData)
        const savedEntity = await testDAO.saveEntity(entity)
        const published = await testDAO.publishEntity(savedEntity)
        const publishedE = await testDAO.loadEntity({id: entity.id, uid: 'craig'}, true)

        //ensure published and status updated
        expect(published).toBeTruthy()
        expect(publishedE.status).toBe(PublishedStatus.PUBLISHED)

        const unPublished = await testDAO.unPublishEntity(savedEntity)
        const unPublishedE = await testDAO.loadEntity({id: entity.id, uid: 'craig'}, false)
        expect(unPublished).toBeTruthy()
        expect(unPublishedE.status).toBe(PublishedStatus.UNPUBLISHED)
      })

      it('Test reverting an entity', async () => {
        const oldValue = 'x'
        const newValue = 'x'
        const entity = new TestEntity(testData)
        entity.stringTest = oldValue
        const savedEntity = await testDAO.saveEntity(entity)
        const published = await testDAO.publishEntity(savedEntity)
        expect(published).toBeTruthy()
        savedEntity.stringTest=newValue
        const updatedEntity = await testDAO.updateEntity(savedEntity)
        expect(updatedEntity.stringTest).toBe(newValue)
        const reverted = await testDAO.revertEntityChanges(updatedEntity)
        expect(reverted).toBeTruthy()
        const revertedEntity = await testDAO.loadEntity({id:savedEntity.id , uid: 'craig'}, false)
        expect(revertedEntity.stringTest).toBe(oldValue)
        
      })

      it('Test deleteing an entity', async () => {
        const entity = new TestEntity(testData)
        const savedEntity = await testDAO.saveEntity(entity)
        await testDAO.publishEntity(savedEntity)
        await testDAO.deleteEntity(savedEntity)

        const unPublishedEntity = await testDAO.loadEntity({uid: 'craig', id: savedEntity.id}, false)
        const publishedEntity = await testDAO.loadEntity({uid: 'craig', id: savedEntity.id}, true)
        expect(unPublishedEntity).toBeNull()
        expect(publishedEntity).toBeNull()    
      })

     
//Todo implement testing for callbacks
      it('Test loadEntities', async () => {
        db.database().ref().set(null);
        const entity = new TestEntity(testData)
        await testDAO.saveEntity(entity)
        await testDAO.saveEntity(entity)
        await testDAO.saveEntity(entity)
        const dummyDispatch = 'dummy'

        const dispatchEntitiesLoaded = (dispatch, entities) => {
          dispatchEntitiesLoadedExecuted = true
          expect(entities.length).toBe(3)
          expect(dispatch).toBe(dummyDispatch)
        } 
        const dispatchEntityAdded = (dispatch, entity, previouskey) => {
          expect(entity).toBeDefined()
          expect(previouskey).toBeDefined()
          expect(dispatch).toBe(dummyDispatch)
        } 
        const dispatchEntityUpdated = (dispatch, entity, previouskey) => {
          expect(entity).toBeDefined()
          expect(previouskey).toBeDefined()
          expect(dispatch).toBe(dummyDispatch)
        } 
        const dispatchEntityRemoved  = (dispatch, entity) => {
          expect(entity).toBeDefined()
          expect(dispatch).toBe(dummyDispatch)
        } 

        const executed = await testDAO.loadEntities({
          params: {uid: 'craig'},
          published: false,
          dispatch: dummyDispatch,
          dispatchEntitiesLoaded,
          dispatchEntityAdded,
          dispatchEntityRemoved,
          dispatchEntityUpdated
        })

        expect(executed).toBeTruthy()
        
  
      })
     
  