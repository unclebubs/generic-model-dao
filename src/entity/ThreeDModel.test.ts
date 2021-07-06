import PublishedStatus from '../entity/PublishedStatus'
import ThreeDModel, { ARPlacment, ARScale, InteractionPrompt, IThreeDModel, Loading, modelDefaults, Reveal } from './ThreeDModel'
import {createModelViewerProps} from './ThreeDModelScripts'

const data: IThreeDModel = {
  id: 'id1',
  status: PublishedStatus.PUBLISHED,
  order: 87,
  planId: 'plan1',
  userId: 'user1',
  referenceId: 'testRef',
  name: 'name1',
  description: 'descrption',
  _src: 'src1',
  _iosSrc: 'iossrc1',
  _poster: 'pp',
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
  _arScale: ARScale.FIXED,
  _arPlacement: ARPlacment.FLOOR,
  _buttonColor: 'buttonColor4',
  _loading: Loading.AUTO,
  _reveal: Reveal.AUTO,
  _interactionPrompt: InteractionPrompt.NONE,
  buttonStates: {
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
    expect(entity[key]).toBe(data[key])
  }
})

it('Test camera-controls and ar Props ', () => {
  const entity: ThreeDModel = new ThreeDModel(data)
  entity.ar = false
  entity.cameraControls = false
  const props = createModelViewerProps(entity)
  expect(props['camera-controls']).toBeFalsy()
  expect(props['ar']).toBeFalsy()
  expect(props['ar-scale']).toBeFalsy()
  expect(props['ar-placement']).toBeFalsy()
  entity.ar = true
  entity.arPlacement = ARPlacment.WALL
  entity.arScale = ARScale.FIXED
  entity.cameraControls = true
  const props2 = createModelViewerProps(entity)
  console.log('props ', props2)
  expect(props2['camera-controls']).toBe('')
  expect(props2['ar']).toBe('')
  expect(props2['ar-scale']).toBe(entity.arScale)
  expect(props2['ar-placement']).toBe(entity.arPlacement)
})

it('Test autorotate Props ', () => {
  const entity: ThreeDModel = new ThreeDModel(data)
  const props2 = createModelViewerProps(entity)

  expect(props2['auto-rotate']).toBeTruthy()
  expect(props2['rotation-per-second']).toBe(entity.rotationPerSecond +'deg')
  expect(props2['auto-rotate-delay']).toBe(entity.autoRotateDelay)

  entity.autoRotate = false
  const props = createModelViewerProps(entity)
  expect(props['auto-rotate']).toBeNull()
  expect(props['rotation-per-second']).toBeNull()
  expect(props['auto-rotate-delay']).toBeNull()

  
})

it('Test use-yaw-limits Props ', () => {
  const entity: ThreeDModel = new ThreeDModel(data)
  entity.useYawLimits = true
  entity.usePitchLimits = true
  entity.yawMinLimit = 45
  entity.radiusMinLimit = 32
  entity.pitchMinLimit = 2
  entity.yawMaxLimit = 45
  entity.radiusMaxLimit = 32
  entity.pitchMaxLimit = 2
  const props2 = createModelViewerProps(entity)

  expect(props2['min-camera-orbit']).toBe(`${entity.yawMinLimit}deg ${entity.pitchMinLimit}deg ${entity.radiusMinLimit}m`)
  expect(props2['max-camera-orbit']).toBe(`${entity.yawMaxLimit}deg ${entity.pitchMaxLimit}deg ${entity.radiusMaxLimit}m`)

  entity.useYawLimits = false
  entity.usePitchLimits = false
  entity.radiusMinLimit = null
  entity.radiusMaxLimit = null
  const props = createModelViewerProps(entity)
  expect(props['min-camera-orbit']).toBeFalsy()
  expect(props['max-camera-orbit']).toBeFalsy()
})

it('Test camera-target props ', () => {
  const entity: ThreeDModel = new ThreeDModel(data)
  entity.cameraTargetX = 0
  entity.cameraTargetY = 0
  entity.cameraTargetZ = 0
  const props = createModelViewerProps(entity)
  expect(props['camera-target']).toBeUndefined()
  entity.cameraTargetX = 1
  entity.cameraTargetY = 0
  entity.cameraTargetZ = 0
  const props2 = createModelViewerProps(entity)
  expect(props2['camera-target']).toBe('1m 0m 0m')
  entity.cameraTargetX = 1
  entity.cameraTargetY = 1
  entity.cameraTargetZ = 1
  const props3 = createModelViewerProps(entity)
  expect(props3['camera-target']).toBe('1m 1m 1m')


})

it('Test loading Creation', () => {
  const entity: ThreeDModel = new ThreeDModel(data)
  entity.loading = Loading.AUTO
  const props = createModelViewerProps(entity)
  expect(props['loading']).toBeFalsy()
  entity.loading = Loading.EAGER
  const props2 = createModelViewerProps(entity)
  expect(props2['loading']).toBe(Loading.EAGER)

})

it('Test no id, status, order in model viewer props', () => {
  const entity: ThreeDModel = new ThreeDModel(data)
  const props = createModelViewerProps(entity)
  expect(props['id']).toBeFalsy()
  

})

it('Test reveal Creation', () => {
  const entity: ThreeDModel = new ThreeDModel(data)
  entity.reveal = Reveal.AUTO
  const props = createModelViewerProps(entity)
  expect(props['reveal']).toBeFalsy()
  entity.reveal = Reveal.MANUAL
  const props2 = createModelViewerProps(entity)
  expect(props2['reveal']).toBe(Reveal.MANUAL)

})


it('Test interactionPrompt Creation', () => {
  const entity: ThreeDModel = new ThreeDModel(data)
  entity.interactionPrompt = InteractionPrompt.AUTO
  const props = createModelViewerProps(entity)
  expect(props['interaction_prompt']).toBeFalsy()
  entity.interactionPrompt = InteractionPrompt.NONE
  entity.autoRotate = false
  const props2 = createModelViewerProps(entity)
  console.log('props2', props2['interaction-prompt'])
  // expect(props2['interaction_prompt']).toBe('InteractionPrompt.NONE')

})