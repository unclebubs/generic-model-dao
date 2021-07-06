import { READY } from './ProcessingButtonConstants'
import { Entity, EntityInterface } from '../entity/Entity'

export enum ARScale {
  AUTO = 'auto',
  FIXED = 'fixed'
}

export enum ARPlacment {
  FLOOR = 'floor',
  WALL = 'wall'
}

export enum Loading {
  AUTO = 'auto',
  LAZY = 'lay',
  EAGER = 'eager'
}

export enum Reveal {
  AUTO = 'auto',
  INTERACTION = 'interaction',
  MANUAL = 'manual'
}

export enum InteractionPrompt {
  AUTO = 'auto',
  WHEN_FOCUSED = 'when-focused',
  NONE = 'none'
}

export interface IThreeDModel extends EntityInterface {
  _src?: string | null,
  _iosSrc?: string | null,
  _skyboxImage?: string | null,
  _poster?: string | null,
  _hideFullScreenButton?: boolean | null,
  _hideColorsButton?: boolean | null,
  _exposure?: number | null,
  _shadowIntensity?: number | null,
  _shadowSoftness?: number | null,
  _rotationPerSecond?: number | null,
  _autoRotateDelay?: number | null,
  _autoRotate?: boolean | null,
  _cameraControls?: boolean | null,
  _cameraOrbit?: string | null,
  _cameraTargetX?: number | null,
  _cameraTargetY?: number | null,
  _cameraTargetZ?: number | null,
  _useYawLimits?: boolean | null,
  _yawMinLimit?: number | null,
  _yawMaxLimit?: number | null,
  _usePitchLimits?: boolean | null,
  _pitchMinLimit?: number | null,
  _pitchMaxLimit?: number | null,
  _radiusMinLimit?: number | null,
  _radiusMaxLimit?: number | null,
  _minFieldOfView?: number | null,
  _maxFieldOfView?: number | null,
  _fieldOfView?: number | null,
  _ar?: boolean | null,
  _arScale?: ARScale,
  _arPlacement?: ARPlacment,
  _buttonColor?: string | null,
  _loading?: Loading,
  _reveal?: Reveal,
  _interactionPrompt?: InteractionPrompt,
  buttonStates?: {
    deleteButtonState: string,
    publishHotSpotButtonState: string,
    publishButtonState: string,
    unPublishButtonState: string,
    revertChangesButtonState: string
  }
}

class ThreeDModel extends Entity implements IThreeDModel {
  _src = ''
  _iosSrc = ''
  _skyboxImage = ''
  _poster = ''
  _hideFullScreenButton = false
  _hideColorsButton = false
  _exposure = 1
  _shadowIntensity = 1
  _shadowSoftness = 1
  _rotationPerSecond = 50
  _cameraControls = true
  _autoRotateDelay = 2000
  _autoRotate = false
  _cameraOrbit = ''
  _cameraTargetX = 0
  _cameraTargetY = 0
  _cameraTargetZ = 0
  _useYawLimits = false
  _yawMinLimit = -180
  _yawMaxLimit = 180
  _usePitchLimits = false
  _pitchMinLimit = -180
  _pitchMaxLimit = 180
  _radiusMinLimit: number | null = -1
  _radiusMaxLimit: number | null = -1
  _minFieldOfView = 25
  _maxFieldOfView = -1
  _fieldOfView = -1
  _ar = false
  _arScale = ARScale.AUTO
  _arPlacement = ARPlacment.FLOOR
  _buttonColor = ''
  _loading = Loading.AUTO
  _reveal = Reveal.AUTO
  _interactionPrompt = InteractionPrompt.AUTO
  buttonStates = {
    deleteButtonState: READY,
    publishHotSpotButtonState: READY,
    publishButtonState: READY,
    unPublishButtonState: READY,
    revertChangesButtonState: READY,
  }

  public get src (): string {
    return this._src
  }

  public set src (value: string) {
    this._src = value
  }

  public get iosSrc (): string {
    return this._iosSrc
  }

  public set iosSrc (value: string) {
    this._iosSrc = value
  }

  public get skyboxImage (): string {
    return this._skyboxImage
  }

  public set skyboxImage (value: string) {
    this._skyboxImage = value
  }

  public get poster (): string {
    return this._poster
  }

  public set poster (value: string) {
    this._poster = value
  }

  public get hideFullScreenButton (): boolean {
    return this._hideFullScreenButton
  }

  public set hideFullScreenButton (value: boolean) {
    this._hideFullScreenButton = value
  }

  public get hideColorsButton (): boolean {
    return this._hideColorsButton
  }

  public set hideColorsButton (value: boolean) {
    this._hideColorsButton = value
  }

  public get exposure (): number {
    return this._exposure
  }

  public set exposure (value: number) {
    if (value >= 0) {
      this._exposure = value
    }
  }

  public get shadowIntensity (): number {
    return this._shadowIntensity
  }

  public set shadowIntensity (value: number) {
    if (value > 0 && value < 1) {
      this._shadowIntensity = value
    }
  }

  public get shadowSoftness (): number {
    return this._shadowSoftness
  }

  public set shadowSoftness (value: number) {
    if (value > 0 && value < 1) {
      this._shadowSoftness = value
    }
  }

  public get rotationPerSecond (): number {
    return this._rotationPerSecond
  }

  public set rotationPerSecond (value: number) {
    if (this._autoRotate) {
      this._rotationPerSecond = value
    }
  }

  public get autoRotateDelay (): number {
    return this._autoRotateDelay
  }

  public set autoRotateDelay (value: number) {
    if (this._autoRotate) {
      this._autoRotateDelay = value
    }
  }

  public get autoRotate (): boolean {
    return this._autoRotate
  }

  public set autoRotate (value: boolean) {
    this._autoRotate = value
    if (!this._autoRotate) {
      this._autoRotateDelay = modelDefaults._autoRotateDelay
      this._rotationPerSecond = modelDefaults._rotationPerSecond
    }
  }

  public get cameraControls (): boolean {
    return this._cameraControls
  }

  public set cameraControls (value: boolean) {
    this._cameraControls = value
  }

  public get cameraOrbit (): string {
    return this._cameraOrbit
  }

  public set cameraOrbit (value: string) {
    this._cameraOrbit = value
  }

  public get cameraTargetX (): number {
    return this._cameraTargetX
  }

  public set cameraTargetX (value: number) {
    this._cameraTargetX = value
  }

  public get cameraTargetY (): number {
    return this._cameraTargetY
  }

  public set cameraTargetY (value: number) {
    this._cameraTargetY = value
  }

  public get cameraTargetZ (): number {
    return this._cameraTargetZ
  }

  public set cameraTargetZ (value: number) {
    this._cameraTargetZ = value
  }

  public get useYawLimits (): boolean {
    return this._useYawLimits
  }

  public set useYawLimits (value: boolean) {
    this._useYawLimits = value
  }

  public get yawMinLimit (): number {
    return this._yawMinLimit
  }

  public set yawMinLimit (value: number) {
    this._yawMinLimit = value
  }

  public get yawMaxLimit (): number {
    return this._yawMaxLimit
  }

  public set yawMaxLimit (value: number) {
    this._yawMaxLimit = value
  }

  public get usePitchLimits (): boolean {
    return this._usePitchLimits
  }

  public set usePitchLimits (value: boolean) {
    this._usePitchLimits = value
  }

  public get pitchMinLimit (): number {
    return this._pitchMinLimit
  }

  public set pitchMinLimit (value: number) {
    this._pitchMinLimit = value
  }

  public get pitchMaxLimit (): number {
    return this._pitchMaxLimit
  }

  public set pitchMaxLimit (value: number) {
    this._pitchMaxLimit = value
  }

  public get radiusMinLimit (): number | null {
    return this._radiusMinLimit
  }

  public set radiusMinLimit (value: number | null) {
    this._radiusMinLimit = value
  }

  public get radiusMaxLimit (): number | null {
    return this._radiusMaxLimit
  }

  public set radiusMaxLimit (value: number | null) {
    this._radiusMaxLimit = value
  }

  public get minFieldOfView (): number {
    return this._minFieldOfView
  }

  public set minFieldOfView (value: number) {
    this._minFieldOfView = value
  }

  public get maxFieldOfView (): number {
    return this._maxFieldOfView
  }

  public set maxFieldOfView (value: number) {
    this._maxFieldOfView = value
  }

  public get fieldOfView (): number {
    return this._fieldOfView
  }

  public set fieldOfView (value: number) {
    this._fieldOfView = value
  }

  public get ar (): boolean {
    return this._ar
  }

  public set ar (value: boolean) {
    if (value) {
      this._ar = value
    } else {
      this._arScale = ARScale.AUTO
      this.arPlacement = ARPlacment.FLOOR
    }
  }

  public get arScale (): ARScale {
    return this._arScale
  }

  public set arScale (value: ARScale) {
    this._arScale = value
  }

  public get arPlacement (): ARPlacment {
    return this._arPlacement
  }

  public set arPlacement (value: ARPlacment) {
    this._arPlacement = value
  }

  public get buttonColor (): string {
    return this._buttonColor
  }

  public set buttonColor (value: string) {
    this._buttonColor = value
  }

  public get loading (): Loading {
    return this._loading
  }

  public set loading (value: Loading) {
    this._loading = value
  }

  public get reveal (): Reveal {
    return this._reveal
  }

  public set reveal (value: Reveal) {
    this._reveal = value
  }

  public get interactionPrompt (): InteractionPrompt {
    return this._interactionPrompt
  }

  public set interactionPrompt (value: InteractionPrompt) {
    this._interactionPrompt = value
  }

  // public get buttonStates (): any {
  //   return this._buttonStates
  // }

  // // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // public set buttonStates (value: any) {
  //   this._buttonStates = value
  // }

  constructor (params: IThreeDModel) {
    super(params)
    Object.keys(this).forEach((key) => {
      if (params[key]) {
        this[key as keyof this] = params[key]
      }
    })
  }
}

export const modelDefaults = new ThreeDModel({} as IThreeDModel)

export default ThreeDModel
