import { Enemy } from '../../Enemy'
import Player from 'component/player/Player'
import Score from 'component/ui/Score'

import {
  HIT_METEOR_SCORE,
  METEOR_ITEMPHASE_SPEED,
  METEOR_SPEED,
  PLAYER_HIT_DELAY_MS,
} from 'config'
// import SoundManager from 'component/sound/SoundManager'

export class B1BossObstacle extends Enemy {
  // private soundManager: SoundManager
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

    const { width } = this.scene.scale
    const startingX = Math.floor(Math.random() * width)
    this.enemy = this.scene.physics.add.image(startingX - 4, 0, 'bossAsset', 'skull.png')
    this.enemy.depth = 1
    
    this.scene.physics.add.overlap(
      this.player.getBody(),
      this.enemy,
      (_, _meteor) => {
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
    
    this.flareEmitter = scene.add.particles(5, -80, 'bossAsset',{
        frame: 'fireball2.png',
        colorEase: 'quart.out',
        lifespan: 300,
        angle: { min: -100, max: -60 },
        scale: { start: 1, end: 0.5, ease: 'sine.inout' },
        alpha: {start: 1, end: 0.5, ease:"sine.inout"},
        speed: 150,
    });

    // this.soundManager = new SoundManager(scene)
    this.explosionEmitter = scene.add.particles(0, 0, 'explosion', {
      speed: 80,
      scale: 0.6,
      blendMode: Phaser.BlendModes.ADD,
      gravityY: -20,
    })
    
    this.explosionEmitter.active = false
    this.move()
    this.attack()
  }

  create(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
    

    return this.enemy
  }

  move(): void {
    const velocityX = Math.floor(
      Math.random() * (METEOR_SPEED / 3) - METEOR_SPEED / 6,
    )
    this.enemy.setVelocityY(this.isInItemPhase ? METEOR_ITEMPHASE_SPEED : METEOR_SPEED)
    this.enemy.setVelocityX(velocityX)
    
    this.flareEmitter.startFollow(this.enemy)
    this.flareEmitter.depth = 0
    this.scene.time.delayedCall(5000, () => {
      this.flareEmitter.destroy()
    })
  }

  attack(): void {
  }

  hit(): void {
    this.destroy()
  }

  destroy(): void {
  }

  getBody(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
    return this.enemy
  }

  isActive(): boolean {
    return this.enemy.active
  }
}
