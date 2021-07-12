import {initializeTestApp} from '@firebase/rules-unit-testing'
import Product, { IProduct } from '../entity/Product';
import PublishedStatus from '../entity/PublishedStatus';
import ProductDAO from './ProductDAO';

let testDAO : ProductDAO
let db
 
beforeAll(async () => {
  db = initializeTestApp({ databaseName: 'testdao', auth: {uid: 'craig'} })
  db.database().ref().set(null);
  testDAO = new ProductDAO()
  testDAO.firebase = db
})

afterEach(() => {
//   db.database().ref().set(null);
})

const productData: IProduct = {
  'id': '-Me-JFwHe6rWXIrcj87-',
  'planId': '',
  'name': '',
  'description': '',
  'userId': 'dummy',
  'maxModels': 20,
  'maxUploadSize': 50,
  'productTypes': ['3DMODEL'],
  'status': PublishedStatus.UNPUBLISHED,
  'referenceId' : '-1',
  'order': -1,
}

it('Test saving of new Entity', async () => {
  const testEntity = new Product(productData)
  const savedEntity = await testDAO.saveEntity(testEntity)
  for (const key in savedEntity) {
    if (key === 'id') {
      expect(savedEntity[key]).not.toBe(productData[key])
      expect(savedEntity).not.toBeNull()
    } else  if (key === 'referenceId') {
      expect(savedEntity[key]).not.toBe(productData[key])
      expect(savedEntity).not.toBeNull()
    } else {
      console.log('testing ', key)
      expect(savedEntity[key]).toBe(productData[key])
    }
  }
  expect(savedEntity instanceof Product).toBe(true)
})


it('Test loading an entity by id', async () => {
  const testEntity = new Product(productData)
  const savedEntity = await testDAO.saveEntity(testEntity)

  const loadedEntity = await testDAO.loadEntity({id: savedEntity.id}, false)
  expect(loadedEntity.id).toBe(testEntity.id)
})