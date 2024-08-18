import { MARGIN } from 'config'

export default class Menu {
	private menu!: Phaser.GameObjects.Image
	private layer: Phaser.GameObjects.Layer

	private subSceneKeys!: string[]

	private score!: number
	private lap!: number

	constructor(scene: Phaser.Scene, subSceneKeys?: string[]) {
		if (!subSceneKeys) {
			this.subSceneKeys = []
		} else {
			this.subSceneKeys = subSceneKeys
		}
		const { width } = scene.scale
		this.layer = scene.add.layer()
		this.menu = scene.add
			.image(width - MARGIN, MARGIN / 2, 'ui', 'pause.png')
			.setOrigin(1, 0)
		this.menu.setInteractive()
		this.menu.on('pointerup', () => {
			this.menu.setTexture('ui', 'play.png')

			scene.scene.pause()
			for (let i = 0; i < this.subSceneKeys.length; i++) {
				if (scene.scene.isActive(this.subSceneKeys[i])) {
					scene.scene.pause(this.subSceneKeys[i])
				}
			}

			scene.scene.launch('pause', {
				menu: this.menu,
				sceneName: scene.scene.key,
				subSceneKeys: subSceneKeys,
				score: this.score,
				lap: this.lap,
			})
		})
		this.layer.add(this.menu)
		this.layer.setDepth(10)
	}

	updateGameState(score: number, lap: number) {
		this.score = score
		this.lap = lap
	}

	getBody(): Phaser.GameObjects.Image {
		return this.menu
	}

	getLayer(): Phaser.GameObjects.Layer {
		return this.layer
	}

	getSubSceneKeys(): string[] {
		return this.subSceneKeys
	}
}
