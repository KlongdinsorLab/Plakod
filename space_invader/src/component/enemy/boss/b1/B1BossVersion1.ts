import { BossVersion } from '../BossVersion'
import {
	LARGE_FONT_SIZE,
	MARGIN,
	PHASE_1_BOSS_TIME_MS,
	PHASE_2_BOSS_TIME_MS,
} from 'config'
import I18nSingleton from 'i18n/I18nSingleton'
import WebFont from 'webfontloader'
import SoundManager from 'component/sound/SoundManager'
import Player from 'component/player/Player'
import { Boss } from '../Boss'
import { MeteorFactory } from 'component/enemy/MeteorFactory'
import Score from 'component/ui/Score'

export class B1BossVersion1 extends BossVersion {
	private meteorFactory!: MeteorFactory
	constructor(){
		super()
		this.meteorFactory = new MeteorFactory()
	}
	createAnimation(scene: Phaser.Scene): Phaser.GameObjects.PathFollower {
		const { width } = scene.scale
		const path = new Phaser.Curves.Path(0, 0)
		scene.anims.remove('boss-move')
		scene.anims.remove('boss-hit')
		scene.anims.create({
			key: 'boss-move',
			frames: scene.anims.generateFrameNames('b1v1', {
				prefix: 'b1v1_attack_',
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
			frames: scene.anims.generateFrameNames('b1v1', {
				prefix: 'b1v1_hurt_',
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
		const randomVector = [...Array(5)].map((_) => {
			return new Phaser.Math.Vector2(
				Math.floor(Math.random() * width),
				Math.floor(Math.random() * width),
			)
		})
		const path = new Phaser.Curves.Path(enemy.x, enemy.y)
			.lineTo(width / 2, 350)
			.circleTo(100)
			.splineTo(randomVector)
			.circleTo(60)
			.lineTo(width / 2, 100)
			.lineTo(width + 200, 400)
			.lineTo(-200, 400)
		return path
	}

	isShootAttack(): boolean {
		return false
	}

	hasObstacle(): boolean {
		return false
	}

	hasBoosterDrop(): boolean {
		return false
	}

	hasSkill(): boolean {
		return false
	}

	useSkill(): void {}

	createObstacleByTime(scene: Phaser.Scene,player: Player,score: Score, delta: number): void {
		this.meteorFactory.createByTime(scene, player, score, delta)
	}

	getDurationPhase1(): number {
		return PHASE_1_BOSS_TIME_MS
	}

	getDurationPhase2(): number {
		return PHASE_2_BOSS_TIME_MS
	}

	playVsScene(scene: Phaser.Scene, player: Player): void {
		const { width, height } = scene.scale
		
		scene.add
			.tileSprite(0, 0, width, height, 'boss_cutscene_background')
			.setOrigin(0)
			.setScrollFactor(0, 0)

		const soundManager = new SoundManager(scene)
		const bossB1 = scene.sound.add('bossB1')
		setTimeout(() => {
			soundManager.play(bossB1, false)
		}, 500)

		const rectangleBox = scene.add.rectangle(
			width / 2,
			630,
			2 * width,
			50,
			0x000000,
		)
		rectangleBox.angle = -30

		const bossImage = scene.add
			.image(-350, 500, 'b1v1', 'b1v1_attack_00000.png')
			.setOrigin(0.5, 1)
			.setScale(2.0)
		const bossText = scene.add.text(width / 2, 760, 'VS').setOrigin(0.5, 1)
		const bossName = I18nSingleton.getInstance()
			.createTranslatedText(scene, -320, 280, 'alien_boss_name')
			.setOrigin(0.5, 1)
		
		player.playVsScene(scene)

		bossText
			.setStyle({
				fontFamily: 'Mali',
				color: 'white',
				fontWeight: 900,
			})
			.setFontSize('200px')
			.setStroke('#000000', 36)

		bossName
			.setStyle({
				fontFamily: 'Mali',
				color: 'white',
				fontWeight: 800,
			})
			.setFontSize('7em')
			.setStroke('#FB511C', 18)

		scene.tweens.add({
			targets: bossImage,
			x: 220,
			duration: 1000,
			repeat: 0,
			ease: 'bounce.out',
		})
		scene.tweens.add({
			targets: bossName,
			x: 530,
			duration: 1000,
			repeat: 0,
			ease: 'bounce.out',
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

		const boss = scene.add.follower(path, width / 2, 300, 'b1v1').setOrigin(0.5)
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
		const boss = scene.add.follower(path, width / 2, 300, 'b1v1').setOrigin(0.5)
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

		const bossImage = scene.add.image(width / 2, -140, 'b1v1').setOrigin(0.5, 1)

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
			.createTranslatedText(scene, width / 2, height / 2, 'boss_attack')
			.setOrigin(0.5, 1)
			.setFontSize(LARGE_FONT_SIZE)
			.setAlpha(0)

		const bossImage = scene.add.image(width / 2, -140, 'b1v1').setOrigin(0.5, 1)

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

	playItemTutorial(scene: Phaser.Scene): void {
		const { width, height } = scene.scale
		const avoidText = I18nSingleton.getInstance()
			.createTranslatedText(scene, width / 2, 10 * MARGIN, 'avoid_poison')
			.setOrigin(0.5, 0)
		const bulletText = I18nSingleton.getInstance()
			.createTranslatedText(scene, width / 2, 18 * MARGIN, 'collect_bullet')
			.setOrigin(0.5, 0)

		const poison = scene.add
			.image(width / 2, 9 * MARGIN, 'bossAsset', 'item_poison.png')
			.setOrigin(0.5, 1)
		const bullet = scene.add
			.image(width / 2, 17 * MARGIN, 'bossAsset', 'item_bullet.png')
			.setOrigin(0.5, 1)

		const poisonBox = scene.add
			.graphics()
			.lineStyle(8, 0xfb511c, 1)
			.strokeRoundedRect(width / 3, 6 * MARGIN + 8, width / 3, height / 8, 32)
		const bulletBox = scene.add
			.graphics()
			.lineStyle(8, 0x7eaf08, 1)
			.strokeRoundedRect(width / 3, 14 * MARGIN + 8, width / 3, height / 8, 32)

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
			poison.setVisible(false)
			bullet.setVisible(false)
			poisonBox.setVisible(false)
			bulletBox.setVisible(false)
			avoidText.setVisible(false)
			bulletText.setVisible(false)
		}, 2000)
	}
}