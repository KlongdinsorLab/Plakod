import Phaser from 'phaser'
import I18nSingleton from 'i18n/I18nSingleton'
import {
  LARGE_FONT_SIZE,
  MARGIN,
  MEDIUM_FONT_SIZE,
  MODAL_BACKGROUND_COLOR,
} from 'config'
import SoundManager from 'component/sound/SoundManager'
import TimeService from 'services/timeService'

export type Menu = {
  menu: Phaser.GameObjects.Image
}
export default class PauseScene extends Phaser.Scene {
  private menu!: Phaser.GameObjects.Image
  private sceneName!: string
  private timeService!: TimeService
  private playCount!: number
  private subSceneKeys !: string[]

  constructor() {
    super('pause')
  }

  init({ menu, sceneName, subSceneKeys }:{menu: Phaser.GameObjects.Image, sceneName: string, subSceneKeys : string[]}) {
    this.menu = menu
    this.sceneName = sceneName
    if(subSceneKeys) this.subSceneKeys = subSceneKeys 
    else this.subSceneKeys = []
  }

  preload() {
    this.load.svg('mute', 'assets/icon/mute.svg')
    this.load.svg('unmute', 'assets/icon/unmute.svg')
  }

  create() {
    const soundManager = new SoundManager(this)
    soundManager.pauseAll()
    this.timeService = new TimeService()
    // TODO: call api
		this.playCount = Number(localStorage.getItem('playCount') ?? '')

    const { width, height } = this.scale

    this.add.rectangle(0, 0, width, height, 0x000000, 0.75).setOrigin(0, 0)
    // console.log(this)

    const i18n = I18nSingleton.getInstance()

    const menu = this.add
      .rectangle(
        width / 2,
        height / 2,
        width - 4 * MARGIN,
        height / 2,
        MODAL_BACKGROUND_COLOR,
        0.8,
      )
      .setOrigin(0.5, 0.5)

    i18n
      .createTranslatedText(
        this,
        width / 2,
        menu.y - menu.height / 2 - MARGIN,
        'pause',
      )
      .setFontSize(LARGE_FONT_SIZE)
      .setOrigin(0.5, 1)

    const sound = new SoundManager(this).createSoundToggle(
      width / 2 - MARGIN,
      menu.y - menu.height / 2 + 1.5 * MARGIN,
    )

    const language = i18n
      .createTranslatedText(
        this,
        width / 2 + MARGIN,
        sound.y - MARGIN / 2,
        'language_flag',
      )
      .setFontSize('80px')

    language.setInteractive()
    language.on('pointerup', () => {
      i18n.setLanguage(i18n.getLanguage() === 'th' ? 'en' : 'th')
    })

    const resume = this.add
      .rectangle(
        width / 2,
        menu.y - menu.height / 2 + 4 * MARGIN,
        menu.width - 2 * MARGIN,
        96,
        0x999999,
      )
      .setOrigin(0.5, 0.5)
    i18n
      .createTranslatedText(this, resume.x, resume.y, 'resume')
      .setFontSize(MEDIUM_FONT_SIZE)
      .setOrigin(0.5, 0.5)
    resume.setInteractive()
    resume.on('pointerup', () => {
      soundManager.resumeAll()
      this.menu.setTexture('ui', 'pause.png')
      this.resumeAllScenes()
      this.scene.stop()
    })

    const restart = this.add
      .rectangle(
        width / 2,
        resume.y + 3 * MARGIN,
        menu.width - 2 * MARGIN,
        96,
        0x999999,
      )
      .setOrigin(0.5, 0.5)
      .setVisible(this.playCount % 2 == 1)
    i18n
      .createTranslatedText(this, restart.x, restart.y, 'restart')
      .setFontSize(MEDIUM_FONT_SIZE)
      .setOrigin(0.5, 0.5)
      .setVisible(this.playCount % 2 == 1)
    restart.setInteractive()
    restart.on('pointerup', () => {
      this.timeService.saveLastPlayTime()
      this.scene.stop()
      this.stopAllScenes()
      i18n.destroyEmitter()
      this.scene.start(this.sceneName)
    })

    const home = this.add
      .rectangle(
        width / 2,
        restart.y + 3 * MARGIN,
        menu.width - 2 * MARGIN,
        96,
        0x999999,
      )
      .setOrigin(0.5, 0.5)
    i18n
      .createTranslatedText(this, home.x, home.y, 'home')
      .setFontSize(MEDIUM_FONT_SIZE)
      .setOrigin(0.5, 0.5)
    home.setInteractive()
    home.on('pointerup', () => {
      this.stopAllScenes()
      this.scene.stop()
      i18n.destroyEmitter()
      this.scene.start('title')
    })
  }

  stopAllScenes() : void{
    for(let i = 0; i < this.subSceneKeys.length; i++) this.scene.stop(this.subSceneKeys[i])
    this.scene.stop(this.sceneName)
  }

  resumeAllScenes() : void{
    this.scene.resume(this.sceneName)
    for(let i = 0; i < this.subSceneKeys.length; i++) {
      if(this.scene.isPaused(this.subSceneKeys[i])) { this.scene.resume(this.subSceneKeys[i]) }
    }
  }
}
