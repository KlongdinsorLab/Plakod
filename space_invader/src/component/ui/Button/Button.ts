export abstract class Button {
    protected scene: Phaser.Scene
    protected isActive: boolean = true
    protected button!: Phaser.GameObjects.NineSlice | Phaser.GameObjects.Image
    protected buttonText!: Phaser.GameObjects.Text
    protected buttonLogo!:  Phaser.GameObjects.Image

    protected constructor(
		scene: Phaser.Scene,
	) {
		this.scene = scene
	}

    abstract initFontStyle(): void
    abstract activate(): void
    abstract disable(): void
    abstract getIsActive(): boolean
    abstract getBody(): Phaser.GameObjects.NineSlice | Phaser.GameObjects.Image
    abstract hide(): void
}