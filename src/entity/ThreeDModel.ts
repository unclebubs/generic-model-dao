import { READY } from './ProcessingButtonConstants'
import { Entity, EntityInterface } from '../entity/Entity'

export interface IThreeDModel extends EntityInterface{
    _planId: string,
    _name: string,
    _description: string,
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
    _arScale?: string | null,
    _arPlacement?: string | null,
    _buttonColor?: string | null,
    _loading?: string | null,
    _reveal?: string | null,
    _interactionPrompt?: string | null,
    _buttonStates?: {
      deleteButtonState: string,
      publishHotSpotButtonState: string,
      publishButtonState: string,
      unPublishButtonState: string,
      revertChangesButtonState: string
    }
}


class ThreeDModel extends Entity implements IThreeDModel {
    _planId = ''
    public get planId(): string {
      return this._planId
    }
    public set planId(value: string) {
      this._planId = value
    }


     _name = ''
     public get name(): string {
       return this._name
     }
     public set name(value: string) {
       this._name = value
     }


     _description = ''
     public get description(): string {
       return this._description
     }
     public set description(value: string) {
       this._description = value
     }


     _src = ''
     public get src(): string {
       return this._src
     }
     public set src(value: string) {
       this._src = value
     }
     _iosSrc = ''
     public get iosSrc(): string {
       return this._iosSrc
     }
     public set iosSrc(value: string) {
       this._iosSrc = value
     }

     _skyboxImage = ''
     public get skyboxImage(): string {
       return this._skyboxImage
     }
     public set skyboxImage(value: string) {
       this._skyboxImage = value
     }
     _poster = ''
     public get poster(): string {
       return this._poster
     }
     public set poster(value: string) {
       this._poster = value
     }
     _hideFullScreenButton = false
     public get hideFullScreenButton(): boolean {
       return this._hideFullScreenButton
     }
     public set hideFullScreenButton(value: boolean) {
       this._hideFullScreenButton = value
     }
     _hideColorsButton = false
     public get hideColorsButton(): boolean {
       return this._hideColorsButton
     }
     public set hideColorsButton(value: boolean) {
       this._hideColorsButton = value
     }
     _exposure = 1
     public get exposure(): number{
       return this._exposure
     }
     public set exposure(value: number) {
       this._exposure = value
     }
     _shadowIntensity = 1
     public get shadowIntensity(): number {
       return this._shadowIntensity
     }
     public set shadowIntensity(value: number) {
       this._shadowIntensity = value
     }
     _shadowSoftness = 1
     public get shadowSoftness(): number {
       return this._shadowSoftness
     }
     public set shadowSoftness(value: number) {
       this._shadowSoftness = value
     }
     _rotationPerSecond = 50
     public get rotationPerSecond(): number {
       return this._rotationPerSecond
     }
     public set rotationPerSecond(value: number) {
       if (this._autoRotate) {
         this._rotationPerSecond = value
       }
     }


     _autoRotateDelay = 2000
     public get autoRotateDelay(): number {
       return this._autoRotateDelay
     }
     public set autoRotateDelay(value: number) {
       if (this._autoRotate) {
         this._autoRotateDelay = value
       }
       
     }


    _autoRotate = false
    public get autoRotate(): boolean  {
      return this._autoRotate
    }
    public set autoRotate(value: boolean) {
      this._autoRotate = value
      if (!this._autoRotate) {
        this._autoRotateDelay = modelDefaults._autoRotateDelay
        this._rotationPerSecond = modelDefaults._rotationPerSecond
      }
    }
   
     _cameraControls = true
     public get cameraControls(): boolean {
       return this._cameraControls
     }
     public set cameraControls(value: boolean) {
       this._cameraControls = value
     }
     _cameraOrbit = ''
     public get cameraOrbit(): string {
       return this._cameraOrbit
     }
     public set cameraOrbit(value: string) {
       this._cameraOrbit = value
     }
     _cameraTargetX = 0
     public get cameraTargetX(): number {
       return this._cameraTargetX
     }
     public set cameraTargetX(value: number) {
       this._cameraTargetX = value
     }
     _cameraTargetY = 0
     public get cameraTargetY(): number {
       return this._cameraTargetY
     }
     public set cameraTargetY(value: number) {
       this._cameraTargetY = value
     }
     _cameraTargetZ = 0
     public get cameraTargetZ(): number {
       return this._cameraTargetZ
     }
     public set cameraTargetZ(value: number) {
       this._cameraTargetZ = value
     }
     _useYawLimits = false
     public get useYawLimits(): boolean {
       return this._useYawLimits
     }
     public set useYawLimits(value: boolean) {
       this._useYawLimits = value
     }
     _yawMinLimit = -180
     public get yawMinLimit(): number {
       return this._yawMinLimit
     }
     public set yawMinLimit(value: number) {
       this._yawMinLimit = value
     }
     _yawMaxLimit = 180
     public get yawMaxLimit(): number {
       return this._yawMaxLimit
     }
     public set yawMaxLimit(value: number) {
       this._yawMaxLimit = value
     }
     _usePitchLimits = false
     public get usePitchLimits(): boolean {
       return this._usePitchLimits
     }
     public set usePitchLimits(value: boolean) {
       this._usePitchLimits = value
     }
     _pitchMinLimit = -180
     public get pitchMinLimit(): number {
       return this._pitchMinLimit
     }
     public set pitchMinLimit(value: number) {
       this._pitchMinLimit = value
     }
     _pitchMaxLimit = 180
     public get pitchMaxLimit(): number {
       return this._pitchMaxLimit
     }
     public set pitchMaxLimit(value: number) {
       this._pitchMaxLimit = value
     }
     _radiusMinLimit = -1
     public get radiusMinLimit(): number  {
       return this._radiusMinLimit
     }
     public set radiusMinLimit(value: number) {
       this._radiusMinLimit = value
     }
     _radiusMaxLimit = -1
     public get radiusMaxLimit(): number {
       return this._radiusMaxLimit
     }
     public set radiusMaxLimit(value: number) {
       this._radiusMaxLimit = value
     }
     _minFieldOfView = 25
     public get minFieldOfView(): number {
       return this._minFieldOfView
     }
     public set minFieldOfView(value: number) {
       this._minFieldOfView = value
     }
     _maxFieldOfView = -1
     public get maxFieldOfView(): number {
       return this._maxFieldOfView
     }
     public set maxFieldOfView(value: number) {
       this._maxFieldOfView = value
     }
     _fieldOfView = -1
     public get fieldOfView(): number {
       return this._fieldOfView
     }
     public set fieldOfView(value: number) {
       this._fieldOfView = value
     }
     _ar = false
     public get ar(): boolean {
       return this._ar
     }
     public set ar(value: boolean) {
       this._ar = value
     }
     _arScale = 'auto'
     public get arScale(): string {
       return this._arScale
     }
     public set arScale(value: string) {
       this._arScale = value
     }
     _arPlacement = 'floor'
     public get arPlacement(): string {
       return this._arPlacement
     }
     public set arPlacement(value: string) {
       this._arPlacement = value
     }
     _buttonColor = ''
     public get buttonColor(): string {
       return this._buttonColor
     }
     public set buttonColor(value: string) {
       this._buttonColor = value
     }
     _loading = 'auto'
     public get loading(): string {
       return this._loading
     }
     public set loading(value: string) {
       this._loading = value
     }
     _reveal = 'auto'
     public get reveal(): string {
       return this._reveal
     }
     public set reveal(value: string) {
       this._reveal = value
     }
     _interactionPrompt = 'auto'
     public get interactionPrompt(): string {
       return this._interactionPrompt
     }
     public set interactionPrompt(value: string) {
       this._interactionPrompt = value
     }
     _buttonStates = {
       deleteButtonState: READY,
       publishHotSpotButtonState: READY,
       publishButtonState: READY,
       unPublishButtonState: READY,
       revertChangesButtonState: READY,
     }
     public get buttonStates(): any {
       return this._buttonStates
     }
     // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
     public set buttonStates(value: any) {
       this._buttonStates = value
     }
    

     constructor (params: IThreeDModel) {
       super(params)
       Object.keys(this).forEach(key => { 
         if (params[key]) {
           this[key] = params[key]
         }
       })
     }
}

export const modelDefaults = new ThreeDModel({} as IThreeDModel)

export default ThreeDModel
