export abstract class Popup{
    protected scene: Phaser.Scene

    protected constructor(
        scene: Phaser.Scene,
    ) {
        this.scene = scene
    }
    abstract create():void
    abstract destroy():void
}