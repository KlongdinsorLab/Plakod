import Phaser from 'phaser'
import MergedInput, { Player as InputPlayer } from 'phaser3-merged-input'
//import Player from 'component/player/Player'
import SoundManager from 'component/sound/SoundManager'
import { MEDIUM_FONT_SIZE } from 'config'
import I18nSingleton from 'i18n/I18nSingleton'
import MockAPIService from 'services/API/mockUp/MockAPIService'
import { Vas } from 'services/API/mockUp/fakeDatabase'

export default class TitleScene extends Phaser.Scene {
  //	private background!: Phaser.GameObjects.TileSprite
  private mergedInput?: MergedInput
  private controller1?: InputPlayer | any
  //	private player?: Player
  private bgm?: Phaser.Sound.BaseSound
  private hasController = false

  constructor() {
    super('title')
  }

  preload() {
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    this.load.image('titleBackground', 'assets/background/title-background.jpg')
    this.load.image('logo', 'assets/logo/logo_1-01.png')
    //		this.load.image('player', 'assets/character/player/playerShip1_blue.png')
    this.load.image('fire', 'assets/effect/fire03.png')
    // this.load.audio('bgm', 'sound/hofman-138068.mp3')
    this.load.audio('bgm', 'sound/BGM_GameScene.mp3')

    this.load.scenePlugin('mergedInput', MergedInput)

    this.load.audioSprite('tutorialWarmupSound', 'sound/audio_sprites/tt-warmup-boss-sound.json', [
      'sound/audio_sprites/tt-warmup-boss-sound.mp3'
    ]);

    this.load.audioSprite('mcSound', 'sound/audio_sprites/mc1-sound.json', [
    'sound/audio_sprites/mc1-sound.mp3'
    ]);

		this.load.audioSprite('bossSound', 'sound/audio_sprites/b1-sound.json', [
			'sound/audio_sprites/b1-sound.mp3',
		])
  }

  async create() {

    // TESTING API
    const tirabase = new MockAPIService();
    let log: any = ''
    let waitTime = 50

    console.log('Register')
    log = await tirabase.register(
      '0958927519',
      21,
      "M",
      600,
      1
    )
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Login')
    log = await tirabase.login('0958927519')
    //log = await tirabase.login('0958927518')
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Player')
    log = await tirabase.getPlayer()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Update Player Username')
    log = await tirabase.updatePlayerUsername('KaTi')
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Update Player Difficult')
    log = await tirabase.updatePlayerDifficulty(2)
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Update Player Airflow')
    log = await tirabase.updatePlayerAirflow(400)
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Update Player Using Character')
    try {
      log = await tirabase.updatePlayerUsingCharacter(3)
      console.log(log)
    } catch (error) {
      console.log(error)
    }
    
    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    try {
      console.log('Add Player Character')
      log = await tirabase.addPlayerCharacter(2)
      console.log(log)
    } catch (error) {
      console.log(error)
    }

    console.log('Get Player')
    log = await tirabase.getPlayer()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })
    
    console.log('Get my Ranking')
      log = await tirabase.getMyRanking()
      console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Ranking')
    log = await tirabase.getRankings()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Start Game Session')
    log = await tirabase.startGameSession([])
    console.log(log)
    const gsId = log.response.gameSessionId

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Ranking')
    log = await tirabase.getRankings()
    console.log(log)
    
    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Update Game Session')
    log = await tirabase.updateGameSession(gsId, 100000000, 10)
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Game Session')
    log = await tirabase.getGameSession(gsId)
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Ranking')
    log = await tirabase.getRankings()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Player')
    log = await tirabase.getPlayer()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Player Level')
    log = await tirabase.getPlayerLevel()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Player Booster')
    log = await tirabase.getPlayerBoosters()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Player Achievement')
    log = await tirabase.getPlayerAchievements()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('finishGameSession')
    log = await tirabase.finishGameSession(gsId, 10000000000, 10, false)
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    try {
      console.log('Add Player Character')
      log = await tirabase.addPlayerCharacter(2)
      console.log(log)
    } catch (error) {
      console.log(error)
    }

    console.log('Get Player')
    log = await tirabase.getPlayer()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Player Booster')
    log = await tirabase.getPlayerBoosters()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Player Achievement')
    log = await tirabase.getPlayerAchievements()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log(`Start game with Apply Player Booster`)
    let gsId2;
    try {
      log = await tirabase.startGameSession([
        1,
      ])
      gsId2 = log.response.gameSessionId
    } catch (error) {
      console.log(error)
    }
    
    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Player Booster')
    log = await tirabase.getPlayerBoosters()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Cancel Game Session')
    log = await tirabase.cancelGameSession(gsId2)
    console.log(log)

    console.log('Get Player')
    log = await tirabase.getPlayer()
    console.log(log)

    console.log('Get Ranking')
    log = await tirabase.getRankings()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Player Level')
    log = await tirabase.getPlayerLevel()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Player Achievement')
    log = await tirabase.getPlayerAchievements()
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Add Vas')
    console.log('Vas: ', Vas)
    
    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime + 3000)
    })

    log = await tirabase.addVas(7)
    console.log(log);

    console.log('Vas: ', Vas)

    console.log('Get Achievement')
    log = await tirabase.getAchievement(1)
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Character')
    log = await tirabase.getCharacter(1)
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Booster')
    log = await tirabase.getBooster(1)
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })

    console.log('Get Boss')
    log = await tirabase.getBoss(1)
    console.log(log)

    await new Promise<void>(resolve => {
      setTimeout(resolve, waitTime)
    })
    // TESTING API



    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    this.hasController = urlParams.get('controller') === 'true'

    const { width, height } = this.scale
    //		const i18n = I18nSingleton.getInstance()
    //		this.background = this.add
    //			.tileSprite(0, 0, width, height, 'titleBackground')
    //			.setOrigin(0)
    //			.setScrollFactor(0, 0)

    this.add
      .tileSprite(0, 0, width, height, 'titleBackground')
      .setOrigin(0)
      .setScrollFactor(0, 0)

    this.add.image(width / 2, height / 2, 'logo').setOrigin(0.5, 1)
    I18nSingleton.getInstance()
      .createTranslatedText(this, width / 2, height / 2, 'start text')
      .setFontSize(MEDIUM_FONT_SIZE)
      .setOrigin(0.5, 0)

    this.controller1 = this.mergedInput?.addPlayer(0)
    this.mergedInput
      ?.defineKey(0, 'LEFT', 'LEFT')
      .defineKey(0, 'RIGHT', 'RIGHT')
      .defineKey(0, 'B0', 'SPACE')

    //		this.player = new Player(this)
    //		this.player.addJetEngine()

    this.bgm = this.sound.add('bgm', {volume: 0.5, loop: true})
    const soundManager = new SoundManager(this)
    soundManager.init()
    soundManager.play(this.bgm)

    /* TODO comment just for testing
    const isSetup = localStorage.getItem('setup') ?? false
    if (!isSetup) {
      this.scene.pause()
      this.scene.launch('setup')
    }
    */

    if (!this.hasController && this.input?.gamepad?.total === 0) {
      this.input.gamepad.once(
        'connected',
        () => {
          this.startGame()
        },
        this,
      )
    }

  }

  update() {
    if (
      this.hasController &&
      (this.controller1?.direction.LEFT ||
        this.controller1?.direction.RIGHT ||
        this.controller1?.buttons.B7 > 0 ||
        this.input.pointer1.isDown)
    ) {
      this.startGame()
    }
  }

  startGame() {
    I18nSingleton.getInstance().destroyEmitter()

    this.scene.start(import.meta.env.VITE_START_SCEN || 'home', { bgm: this.bgm })
    //this.scene.start(import.meta.env.VITE_START_SCEN || 'setting')
    // import.meta.env.VITE_START_SCENE && new SoundManager(this).stop(this.bgm!)

  }
}
