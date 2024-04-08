import {
	LARGE_FONT_SIZE,
	MARGIN,
	PHASE_1_BOSS_TIME_MS,
	PHASE_2_BOSS_TIME_MS,
} from 'config'
import { BossVersion } from '../BossVersion'
import WebFont from 'webfontloader'
import SoundManager from 'component/sound/SoundManager'
import I18nSingleton from 'i18n/I18nSingleton'
import { Boss } from '../Boss'
import { BossSkill } from '../BossSkill'
import { B1BossObstacleFactory } from './B1BossObstacleFactory'
import Player from 'component/player/Player'
import Score from 'component/ui/Score'

export class B1BossVersion2 extends BossVersion {
	private skillTimer = 0
	private movePattern!: Phaser.Curves.Path
	private obstacleFactory!: B1BossObstacleFactory

	constructor(){
		super()
		this.obstacleFactory = new B1BossObstacleFactory()
	}

	createAnimation(scene: Phaser.Scene): Phaser.GameObjects.PathFollower {
		const { width } = scene.scale
		const path = new Phaser.Curves.Path(0, 0)
		scene.anims.remove('boss-move')
		scene.anims.remove('boss-hit')
		scene.anims.create({
			key: 'boss-move',
			frames: scene.anims.generateFrameNames('b1v2', {
				prefix: 'b1v2_attack_',
				suffix: '.png',
				start: 1,
				end: 12,
				zeroPad: 5,
			}),
			frameRate: 18,
			repeat: -1,
		})

		scene.anims.create({
			key: 'boss-hit',
			frames: scene.anims.generateFrameNames('b1v2', {
				prefix: 'b1v2_hurt_',
				suffix: '.png',
				start: 1,
				end: 1,
				zeroPad: 5,
			}),
			frameRate: 18,
			repeat: -1,
		})
		return scene.add.follower(path, width / 2, -140, 'b1v1').setOrigin(0.5)
	}

	getMovePattern(scene: Phaser.Scene, boss: Boss): Phaser.Curves.Path {
		const enemy = boss.getBody()
		const { width } = scene.scale
		const path = new Phaser.Curves.Path(enemy.x, enemy.y)
			.lineTo(width / 2, 350)
			.circleTo(100)
			.circleTo(60)
			.lineTo(width / 2, 100)
			.lineTo(width + 200, 400)
			.lineTo(-200, 400)
			.lineTo(width / 2, 350)
			.circleTo(100)
			.circleTo(60)
			.lineTo(width / 2, 100)
			.lineTo(width + 200, 400)
			.lineTo(-200, 400)
		this.movePattern = path
		return path
	}

	isShootAttack(): boolean {
		return false
	}

	hasObstacle(): boolean {
		return true
	}

	hasBoosterDrop(): boolean {
		return true
	}

	hasSkill(): boolean {
		return true
	}

	useSkill(bossSkill: BossSkill, delta: number): void {
		if(this.skillTimer === 0){
			bossSkill.setMovePath(this.movePattern)
			bossSkill.move()
		}
		this.skillTimer += delta

		if(this.skillTimer > 12000 && this.skillTimer < 18000){
			bossSkill.setActive(true)
			return
		}
		
		if(this.skillTimer > 36000 && this.skillTimer < 42000){
			bossSkill.setActive(true)
			return
		}

		bossSkill.setActive(false)
	}

	createObstacleByTime(scene: Phaser.Scene,player: Player,score: Score, delta: number): void {
		this.obstacleFactory.createByTime(scene, player, score, delta)
	}

	getDurationPhase1(): number {
		return PHASE_1_BOSS_TIME_MS
	}

	getDurationPhase2(): number {
		return PHASE_2_BOSS_TIME_MS
	}

	playVsScene(scene: Phaser.Scene): void {
		const { width, height } = scene.scale
		scene.add
			.tileSprite(0, 0, width, height, 'boss_cutscene_background')
			.setOrigin(0)
			.setScrollFactor(0, 0)

		const bossText = I18nSingleton.getInstance()
		.createTranslatedText(scene, width / 2, height - 2*MARGIN, 'alien_boss_name_version2')
		.setOrigin(0.5, 1)

		WebFont.load({
			google: {
				families: ['Mali'],
			},
			active: function () {
				const bossTutorialUiStyle = {
					fontFamily: 'Mali',
				}

				bossText
					.setStyle({
						...bossTutorialUiStyle,
						color: 'white',
						fontWeight: 700,
						align: 'center'
					})
					.setFontSize('80px')
					.setStroke('#FB511C', 16)
			},
		})

		scene.anims.create({
			key: 'b1v1',
			frames: scene.anims.generateFrameNames('b1v1', {
				prefix: 'b1v1_attack_',
				suffix: '.png',
				start: 1,
				end: 1,
				zeroPad: 5,
			}),
			frameRate: 1,
			repeat: -1,
		})

		const group = scene.add.group({key: 'tranform'}).setOrigin(0.5,1).setXY(width / 2, -140).scaleXY(1);
		group.playAnimation('b1v1');

		scene.tweens.add({
			targets: group.getChildren(),
			x: width / 2,
			y: height / 2,
			duration: 1000,
			repeat: 0,
			ease: 'sine.out',
			onComplete: () => {
				const b1v1 = scene.anims.get('b1v1')
				const newFrames = scene.anims.generateFrameNames('b1v2', {
					prefix: 'b1v2_attack_',
					suffix: '.png',
					start: 6,
					end: 7,
					zeroPad: 5,
				})
				b1v1.addFrame(newFrames)
				setTimeout(() => {
					group.setXY(width / 2, height / 2 + 4*MARGIN)
					group.scaleXY(1.25)
				},1000)
			}
		})
	}

	playEscapePhase1(scene: Phaser.Scene): void {
		const { width } = scene.scale
		const soundManager = new SoundManager(scene)
		const bossEscapeVoice = scene.sound.add('bossEscapeVoice')
		const bossText = I18nSingleton.getInstance()
			.createTranslatedText(scene, width / 2, 600, 'boss_escape')
			.setOrigin(0.5, 1)
			.setAlpha(0)

		WebFont.load({
			google: {
				families: ['Mali'],
			},
			active: function () {
				const bossTutorialUiStyle = {
					fontFamily: 'Mali',
				}

				bossText
					.setStyle({
						...bossTutorialUiStyle,
						color: 'white',
						fontWeight: 700,
					})
					.setFontSize('80px')
					.setStroke('#FB511C', 16)
			},
		})

		const path = new Phaser.Curves.Path(0, 0)
		const path2 = new Phaser.Curves.Path(width / 2, 300).lineTo(width / 2, -140)

		const boss = scene.add.follower(path, width / 2, 300, 'b1v2').setOrigin(0.5)
		boss.play('boss-hit')

		setTimeout(() => {
			soundManager.play(bossEscapeVoice, false)
		}, 500)

		setTimeout(() => {
			boss.setPath(path2).startFollow({ duration: 1500 })
		}, 1000)

		setTimeout(() => {
			scene.tweens.add({
				targets: bossText,
				duration: 200,
				alpha: 1,
			})
		}, 1500)
	}

	playEscapePhase2(scene: Phaser.Scene): void {
		const { width } = scene.scale

		const bossText = I18nSingleton.getInstance()
			.createTranslatedText(scene, width / 2, 600, 'boss_victory')
			.setOrigin(0.5, 1)
			.setAlpha(0)

		WebFont.load({
			google: {
				families: ['Mali'],
			},
			active: function () {
				const bossTutorialUiStyle = {
					fontFamily: 'Mali',
				}

				bossText
					.setStyle({
						...bossTutorialUiStyle,
						color: 'white',
						fontWeight: 700,
						align: 'center',
					})
					.setFontSize('80px')
					.setStroke('#0047FF', 16)
			},
		})

		const path = new Phaser.Curves.Path(0, 0)
		const boss = scene.add.follower(path, width / 2, 300, 'b1v2').setOrigin(0.5)
		const path2 = new Phaser.Curves.Path(width / 2, 300).lineTo(width / 2, -140)

		setTimeout(() => {
			boss.play('boss-hit')
			boss.setPath(path2).startFollow({ duration: 1000 })
			scene.tweens.add({
				targets: bossText,
				duration: 200,
				alpha: 1,
			})
		}, 1000)
	}

	playTutorialPhase1(scene: Phaser.Scene): void {
		const { width, height } = scene.scale
		const bossText = I18nSingleton.getInstance()
			.createTranslatedText(scene, width / 2, height / 2, 'boss_attack')
			.setOrigin(0.5, 1)
			.setFontSize(LARGE_FONT_SIZE)
			.setAlpha(0)

		const bossImage = scene.add.image(width / 2, -140, 'b1v2').setOrigin(0.5, 1)

		WebFont.load({
			google: {
				families: ['Mali'],
			},
			active: function () {
				const bossTutorialUiStyle = {
					fontFamily: 'Mali',
				}

				bossText
					.setStyle({
						...bossTutorialUiStyle,
						color: 'white',
						fontWeight: 700,
					})
					.setFontSize('6em')
					.setStroke('#FB511C', 12)
			},
		})

		scene.tweens.add({
			targets: bossText,
			duration: 200,
			alpha: 1,
		})

		scene.tweens.add({
			targets: bossImage,
			y: 480,
			duration: 1000,
			repeat: 0,
			ease: 'sine.out',
		})
	}

	playTutorialPhase2(scene: Phaser.Scene): void {
		const { width, height } = scene.scale

		const bossText = I18nSingleton.getInstance()
			.createTranslatedText(scene, width / 2, height / 2 + 2*MARGIN, 'boss_attack_skill')
			.setOrigin(0.5, 1)
			.setFontSize(LARGE_FONT_SIZE)

		const shield = scene.add.ellipse(width / 2, 480, 420, 420, 0x5C5454).setOrigin(0.5, 1);
		const group = scene.add.group({key: 'tranform'}).setXY(width / 2, 480).setOrigin(0.5, 1).scaleXY(0.5);
		group.playAnimation('boss-move')
		group.add(shield)

		scene.tweens.add({
			targets: shield,
			duration: 1500,
			alpha: 0,
			repeat: -1,
			ease: 'sine.out'
		})

		WebFont.load({
			google: {
				families: ['Mali'],
			},
			active: function () {
				const bossTutorialUiStyle = {
					fontFamily: 'Mali',
				}

				bossText
					.setStyle({
						...bossTutorialUiStyle,
						color: 'white',
						fontWeight: 700,
						align: "center"
					})
					.setFontSize('6em')
					.setStroke('#FB511C', 12)
			},
		})
	}

	playItemTutorial(scene: Phaser.Scene): void {
		const { width, height } = scene.scale
		const avoidText = I18nSingleton.getInstance()
			.createTranslatedText(scene, width / 2, 9 * MARGIN, 'avoid_poison')
			.setOrigin(0.5, 0)
		const bulletText = I18nSingleton.getInstance()
			.createTranslatedText(scene, width / 2, 17 * MARGIN, 'collect_item')
			.setOrigin(0.5, 0)

		const meteor = scene.physics.add.staticGroup()
		meteor
			.create(width / 3, 8 * MARGIN, 'bossAsset', 'fireball2.png')
			.setOrigin(0.5, 1)
		meteor
			.create(width / 3 - 4, 8 * MARGIN - 16, 'bossAsset', 'skull.png')
			.setOrigin(0.5, 1)
		const poison = scene.add
			.image((2 * width) / 3, 8 * MARGIN, 'bossAsset', 'item_poison.png')
			.setOrigin(0.5, 1)
		const bullet = scene.add
			.image(width / 3, 16 * MARGIN, 'bossAsset', 'item_bullet.png')
			.setOrigin(0.5, 1)
		const booster = scene.add
			.image((2 * width) / 3, 16 * MARGIN, 'bossAsset', 'booster_random.png')
			.setOrigin(0.5, 1)

		const poisonBox = scene.add
			.graphics()
			.lineStyle(8, 0xfb511c, 1)
			.strokeRoundedRect(
				width / 6,
				4 * MARGIN + 16,
				width / 1.5,
				height / 6,
				32,
			)
		const bulletBox = scene.add
			.graphics()
			.lineStyle(8, 0x7eaf08, 1)
			.strokeRoundedRect(
				width / 6,
				12 * MARGIN + 16,
				width / 1.5,
				height / 6,
				32,
			)

		WebFont.load({
			google: {
				families: ['Mali'],
			},
			active: function () {
				const bossTutorialUiStyle = {
					fontFamily: 'Mali',
				}

				avoidText
					.setStyle({
						...bossTutorialUiStyle,
						color: 'white',
						fontWeight: 700,
					})
					.setFontSize('6em')
					.setStroke('#FB511C', 12)

				bulletText
					.setStyle({
						...bossTutorialUiStyle,
						color: 'white',
						fontWeight: 700,
					})
					.setFontSize('6em')
					.setStroke('#7EAF08', 12)
			},
		})

		setTimeout(() => {
			meteor.setVisible(false)
			poison.setVisible(false)
			bullet.setVisible(false)
			booster.setVisible(false)
			poisonBox.setVisible(false)
			bulletBox.setVisible(false)
			avoidText.setVisible(false)
			bulletText.setVisible(false)
		}, 2000)
	}
}
