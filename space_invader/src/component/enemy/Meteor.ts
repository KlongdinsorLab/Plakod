import { Enemy } from './Enemy'
import Player from 'component/player/Player'
import Score from 'component/ui/Score'

import {
  DESTROY_METEOR_SCORE,
  HIT_METEOR_SCORE,
  METEOR_ITEMPHASE_SPEED,
  METEOR_SPEED,
  METEOR_SPIN_SPEED,
  PLAYER_HIT_DELAY_MS,
} from 'config'
// import SoundManager from 'component/sound/SoundManager'

import { boosters } from 'scene/booster/RedeemScene'
import { Booster3 } from 'component/booster/boosterList/booster_3'
import { Booster5 } from 'component/booster/boosterList/booster_5'
import { BoosterName } from 'component/booster/booster'
export class Meteor extends Enemy {
  // private soundManager: SoundManager
  private explosionEmitter: Phaser.GameObjects.Particles.ParticleEmitter
  private flareEmitter: Phaser.GameObjects.Particles.ParticleEmitter
  private soundEffect!: Phaser.Sound.NoAudioSound | Phaser.Sound.WebAudioSound | Phaser.Sound.HTML5AudioSound
  private hitMeteorScore!: number
  private destroyMeteorScore!: number

  private booster3?: Booster3
  private booster5?: Booster5

  constructor(
    scene: Phaser.Scene,
    player: Player,
    score: Score,
    soundEffect: Phaser.Sound.NoAudioSound | Phaser.Sound.WebAudioSound | Phaser.Sound.HTML5AudioSound,
    isTutorial?: boolean,
    isInItemPhase?: boolean
  ) {
    super(scene, player, score, isTutorial, isInItemPhase)
    // this.soundManager = new SoundManager(scene)
    this.soundEffect = soundEffect
    this.explosionEmitter = scene.add.particles(0, 0, 'explosion', {
      speed: 80,
      scale: 0.6,
      blendMode: Phaser.BlendModes.ADD,
      gravityY: -20,
    })
    this.flareEmitter = scene.add.particles(5, -80, 'bossAsset',{
      frame: 'fireball1.png',
      colorEase: 'quart.out',
      lifespan: 300,
      angle: { min: -100, max: -80 },
      scale: { start: 1, end: 0.5, ease: 'sine.out' },
      alpha: {start: 1, end: 0.5, ease:"sine.inout"},
      speed: 150,
  });
    this.explosionEmitter.active = false
    // this.enermyDestroyedSound = this.scene.sound.add('meteorDestroyedSound')
    
    this.hitMeteorScore = HIT_METEOR_SCORE
    this.destroyMeteorScore = DESTROY_METEOR_SCORE

    if(boosters.includes(BoosterName.BOOSTER_3)){
      this.booster3 = new Booster3()
      this.hitMeteorScore = this.booster3.applyBooster(HIT_METEOR_SCORE)
    }
    if(boosters.includes(BoosterName.BOOSTER_5)){
      this.booster5 = new Booster5()
      this.destroyMeteorScore = this.booster5.applyBooster(DESTROY_METEOR_SCORE)
    }

    
    
    this.move()
    this.attack()
  }

  create(
    isTutorial?: boolean,
  ): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
    const { width } = this.scene.scale
    const startingX = isTutorial ? width / 2 : Math.floor(Math.random() * width)
    this.enemy = this.scene.physics.add.image(startingX - 4, 0, 'bossAsset', 'stone.png')
    this.enemy.depth = 1

    this.scene.physics.add.overlap(
      this.player.getBody(),
      this.enemy,
      (_, _meteor) => {
        if (this.player.getIsHit()) return
        this.player.setIsHit(true)
        this.player.damaged()
        this.score.add(this.hitMeteorScore)
        this.scene.time.delayedCall(PLAYER_HIT_DELAY_MS, () => {
          this.player.setIsHit(false)
          this.player.recovered()
        })
      },
    )
    this.scene.time.delayedCall(5000, () => {
      this.enemy.destroy()
    })

    return this.enemy
  }

  move(): void {
    this.isInItemPhase ? this.enemy.setVelocityY(METEOR_ITEMPHASE_SPEED) : this.enemy.setVelocityY(METEOR_SPEED)
    this.flareEmitter.startFollow(this.enemy)
    this.flareEmitter.depth = 0
    const velocityX = Math.floor(
      Math.random() * (METEOR_SPEED / 3) - METEOR_SPEED / 6,
    )
    this.enemy.setVelocityX(this.isTutorial ? -120 : velocityX)
    this.enemy.setAngularVelocity(METEOR_SPIN_SPEED)
    this.scene.time.delayedCall(5000, () => {
      this.flareEmitter.destroy()
    })
  }

  attack(): void {
    // Do Nothing
    //        this.scene.physics.add.overlap(this.player.getBody(), this.enemy, (_, _meteor) => {
    //            if (this.player.getIsHit()) return;
    //            this.player.setIsHit(true)
    //            this.player.damaged()
    //            this.score.add(HIT_METEOR_SCORE)
    //            this.scene.time.delayedCall(PLAYER_HIT_DELAY_MS, () => {
    //                this.player.setIsHit(false)
    //                this.player.recovered()
    //            })
    //        })
    //        this.scene.time.delayedCall(5000, () => {
    //            this.enemy.destroy()
    //        })
  }

  hit(): void {
    this.destroy()
  }

  destroy(): void {
    this.explosionEmitter.startFollow(this.enemy)
    this.explosionEmitter.active = true
    this.explosionEmitter.start()
    this.scene.time.delayedCall(200, () => {
      this.explosionEmitter.stop()
    })
    this.enemy.destroy()
    this.flareEmitter.destroy()
    // this.soundManager.play(this.enermyDestroyedSound!, true)
    this.soundEffect.play("rock-destroy")
    this.score.add(this.destroyMeteorScore)
  }

  getBody(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
    return this.enemy
  }

  isActive(): boolean {
    return this.enemy.active
  }
}
