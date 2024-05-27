import { Enemy } from '../Enemy'
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
import SoundManager from 'component/sound/SoundManager'

export class B1Obstacle extends Enemy {
  private soundManager: SoundManager
  private explosionEmitter: Phaser.GameObjects.Particles.ParticleEmitter
  private flareEmitter: Phaser.GameObjects.Particles.ParticleEmitter

  constructor(
    scene: Phaser.Scene,
    player: Player,
    score: Score,
    isTutorial?: boolean,
    isInItemPhase?: boolean
  ) {
    super(scene, player, score, isTutorial, isInItemPhase)
    this.soundManager = new SoundManager(scene)
    this.explosionEmitter = scene.add.particles(0, 0, 'explosion', {
      speed: 80,
      scale: 0.6,
      blendMode: Phaser.BlendModes.ADD,
      gravityY: -20,
    })
    this.flareEmitter = scene.add.particles(5, -80, 'bossAsset',{
      frame: 'fireball1.png',
      colorEase: 'quart.out',
      lifespan: isInItemPhase ? 200 : 300,
      angle: { min: -100, max: -80 },
      scale: { start: 1, end: 0.5, ease: 'sine.out' },
      alpha: {start: 1, end: 0.5, ease:"sine.inout"},
      speed: 150,
  });
    this.explosionEmitter.active = false
    this.enemyDestroyedSound = this.scene.sound.add('meteorDestroyedSound')
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
      (_, _obstacle) => {
        if (this.player.getIsHit()) return
        this.player.setIsHit(true)
        this.player.damaged()
        this.score.add(HIT_METEOR_SCORE)
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
    this.soundManager.play(this.enemyDestroyedSound!, true)
    this.score.add(DESTROY_METEOR_SCORE)
  }

  getBody(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
    return this.enemy
  }

  isActive(): boolean {
    return this.enemy.active
  }
}
