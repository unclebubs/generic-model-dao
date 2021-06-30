import ThreeDModel, {modelDefaults} from './ThreeDModel'

 const camelCaseToDash = (str) => {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

const covertCamelCaseObjectToDash = (obj) => {
  const newObj = {}
  for (const prop in obj) {
    newObj[camelCaseToDash(prop)] = obj[prop]
  }
  return newObj
}


const extractModelViewerProps = (allProperties) => {
  const {
    id, userId, planId, productId, subscriptionId, name, description,
    order, status, buttonStates, buttonColor, hideFullScreenButton,
    ...requiredModelViewerProps
  } = allProperties
  return requiredModelViewerProps
}

const removeReliantProps = (modelViewerProps) => {
  const sanitizedModelViewerProps = { ...modelViewerProps }
  // remove autorotate props
  if (!sanitizedModelViewerProps.autoRotate) {
    sanitizedModelViewerProps.rotationPerSecond = null
    sanitizedModelViewerProps.autoRotateDelay = null
  }
  return sanitizedModelViewerProps
}

const removeDefaultProps = (modelViewerProps) => {
  const sanitizedProps = { ...modelViewerProps }
  const ignoreKeys = ['cameraTargetX', 'cameraTargetY', 'cameraTargetZ', 'cameraControls', 'ar',
    'radiusMinLimit', 'radiusMaxLimit', 'yawMinLimit', 'pitchMinLimit', 'yawMaxLimit', 'pitchMaxLimit']
  for (const key in sanitizedProps) {
    if (!ignoreKeys.includes(key)) {
      sanitizedProps[key] = sanitizedProps[key] === modelDefaults[key] ? null : sanitizedProps[key]
    }
  }
  return sanitizedProps
}
const applyUnits = (modelViewerProps) => {
  const unitProps = { ...modelViewerProps }
  applyUnit(unitProps, 'rotationPerSecond', 'deg')
  applyCameraTarget(unitProps)
  applyUnit(unitProps, 'minFieldOfView', 'deg')
  applyUnit(unitProps, 'max-field-of-view', 'deg')
  applyUnit(unitProps, 'field-of-view', 'deg')
  applyLimits(unitProps)

  unitProps.cameraControls = unitProps.cameraControls ? '' : null
  unitProps.ar = unitProps.ar ? '' : null
  return unitProps
}

const applyCameraTarget = (modelViewerProps) => {
  const { cameraTargetX, cameraTargetY, cameraTargetZ } = modelViewerProps
  if (cameraTargetX > 0 || cameraTargetY > 0 || cameraTargetZ > 0) {
    modelViewerProps.cameraTarget = `${cameraTargetX}m ${cameraTargetY}m ${cameraTargetZ}m`
  }
  modelViewerProps.cameraTargetX = null
  modelViewerProps.cameraTargetY = null
  modelViewerProps.cameraTargetZ = null
}

const applyLimits = (modelViewerProps) => {
  const {
    useYawLimits, usePitchLimits, radiusMinLimit, radiusMaxLimit,
    yawMinLimit, pitchMinLimit,
    yawMaxLimit, pitchMaxLimit
  } = modelViewerProps
  if (useYawLimits || usePitchLimits || radiusMinLimit || radiusMaxLimit) {
    modelViewerProps['min-camera-orbit'] = `${useYawLimits ? `${yawMinLimit}deg` : 'auto'} ${usePitchLimits ? `${pitchMinLimit}deg` : 'auto'} ${radiusMinLimit ? `${radiusMinLimit}m` : 'auto'}`
    modelViewerProps['max-camera-orbit'] = `${useYawLimits ? `${yawMaxLimit}deg` : 'auto'} ${usePitchLimits ? `${pitchMaxLimit}deg` : 'auto'} ${radiusMaxLimit ? `${radiusMaxLimit}m` : 'auto'}`
  }
  modelViewerProps.useYawLimits = null
  modelViewerProps.usePitchLimits = null
  modelViewerProps.radiusMinLimit = null
  modelViewerProps.radiusMaxLimit = null
  modelViewerProps.yawMinLimit = null
  modelViewerProps.pitchMinLimit = null
  modelViewerProps.yawMaxLimit = null
  modelViewerProps.pitchMaxLimit = null
}

const applyUnit = (modelViewerProps, key, unit) => {
  modelViewerProps[key] = modelViewerProps[key] ? `${modelViewerProps[key]}${unit}` : null
}

const removeUnderScore = (props) => {
  const newObj = {}
  for (const prop in props) {
    const underscoreIndex = prop.indexOf('_')
    if (underscoreIndex != -1) {
      newObj[prop.substr(1, prop.length)] = props[prop]
    }
  }
  return newObj
}

export const createModelViewerProps = (allProperties) => {
  // remove unnessecary props
  
  const allPropertiesRemovedUnderScore = removeUnderScore(allProperties)
  const extractedProps = extractModelViewerProps(allPropertiesRemovedUnderScore)
  
  // remove reliant props
  // eg if !autoRotate remove rotations per second and auto rotate delay
  const sanitizedProps = removeReliantProps(extractedProps)
  

  // remove props that equal the default in modelDefaults
  const cleanedProps = removeDefaultProps(sanitizedProps)
 
  // apply value units
  const unitProps = applyUnits(cleanedProps)
  
  const dashProps = covertCamelCaseObjectToDash(unitProps)


  return { ...dashProps }
}


