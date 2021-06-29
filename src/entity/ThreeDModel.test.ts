import PublishedStatus from '../entity/PublishedStatus'
import ThreeDModel, { IThreeDModel, modelDefaults } from './ThreeDModel'

const data: IThreeDModel = {
  _id: 'id1',
  _status: PublishedStatus.PUBLISHED,
  _order: 87,
  _planId: 'plan1',
  _userId: 'user1',
  _name: 'name1',
  _description: 'descrption',
  _src: 'src1',
  _iosSrc: 'iossrc1',
  _poster: null,
  _skyboxImage: 'skyboxImage3',
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
  _arScale: 'arScale.3',
  _arPlacement: 'arPlacement2',
  _buttonColor: 'buttonColor4',
  _loading: 'loading3',
  _reveal: 'reveal4',
  _interactionPrompt: 'interactionPrompt1',
  _buttonStates: {
    deleteButtonState: 'buttonStates',
    publishHotSpotButtonState: 'buttonStates2',
    publishButtonState: 'buttonStates3',
    unPublishButtonState: 'buttonStates4',
    revertChangesButtonState: 'buttonStates5',
  },
}

it('Test ThreeDModel autorotate functionality', () => {
  const entity: ThreeDModel = new ThreeDModel(data)
  expect(entity._rotationPerSecond).not.toBe(modelDefaults._rotationPerSecond)
  expect(entity._autoRotateDelay).not.toBe(modelDefaults._autoRotateDelay)
  expect(entity._autoRotate).not.toBe(modelDefaults._autoRotate)
  entity.autoRotate = false
  expect(entity._rotationPerSecond).toBe(modelDefaults._rotationPerSecond)
  expect(entity._autoRotateDelay).toBe(modelDefaults._autoRotateDelay)
  expect(entity._autoRotate).toBe(false)
  entity.rotationPerSecond = 33
  entity.autoRotateDelay = 1001
  expect(entity._rotationPerSecond).toBe(modelDefaults._rotationPerSecond)
  expect(entity._autoRotateDelay).toBe(modelDefaults._autoRotateDelay)
})


it('Test ThreeDModel Creation', () => {
  const entity: ThreeDModel = new ThreeDModel(data)
  for (const key in entity) {
    console.log('checking ', key)
    expect(entity[key]).toBe(data[key])
  }
})
