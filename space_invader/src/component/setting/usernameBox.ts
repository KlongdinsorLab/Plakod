import editUsernamePopUp from './editUsernamePopUp'

export default class usernameBox {
	private editUsernamePopUp: editUsernamePopUp | undefined
	private usernameBox: Phaser.GameObjects.Graphics | undefined
	private usernameText: Phaser.GameObjects.Text | undefined
	// private editNameIcon : Phaser.GameObjects.Image | undefined

	constructor(scene: Phaser.Scene) {
		const { width } = scene.scale

		// Username Box
		this.usernameBox = scene.add.graphics()
		this.usernameBox.fillStyle(0xffffff)
		this.usernameBox.fillRoundedRect(width / 2 - 238, 320, 476, 56, 14)
		this.usernameBox.lineStyle(1, 0x727272)
		this.usernameBox.strokeRoundedRect(width / 2 - 238, 320, 476, 56, 14)
		this.usernameBox
			.setInteractive(
				new Phaser.Geom.Rectangle(width / 2 - 238, 320, 476, 56),
				Phaser.Geom.Rectangle.Contains,
			)
			.on('pointerup', () => this.popUpEditName())

		// Username Text
		this.usernameText = scene.add
			.text(width / 2, 320 + 28, '')
			.setColor('#57453B')
			.setPadding(0, 20, 0, 10)
			.setFontSize(32)
			.setOrigin(0.5, 0.5)

		// Edit Name Icon
		scene.add
			.image(width / 2 + 218, 320 + 28, 'sheet', 'logo_setting_edit name.png')
			//.setInteractive().on('pointerup', () => this.popUpEditName())
			.setOrigin(1, 0.5) // Guessed the coordinate
	}

	createPopUp(scene: Phaser.Scene) {
		const { width } = scene.scale
		const username = scene.registry.get('username')

		this.editUsernamePopUp = new editUsernamePopUp(
			scene,
			this.usernameText ??
				scene.add
					.text(width / 2, 320 + 28, '')
					.setColor('#57453B')
					.setPadding(0, 20, 0, 10)
					.setFontSize(32)
					.setOrigin(0.5, 0.5),
			username,
		)
	}

	popUpEditName(): void {
		this.editUsernamePopUp?.popUpEditName()
	}

	setFont(style: any): void {
		this.usernameText?.setStyle(style)
	}
}
