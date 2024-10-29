import { BACK_BUTTON_HITBOX_WIDTH, MARGIN } from "config";

export default class BackButton {
    private scene: Phaser.Scene
    private backButtonHitbox!: Phaser.GameObjects.Rectangle
    constructor(scene : Phaser.Scene, key: string) {
        this.scene = scene
        // TODO Store key in registry
        if(this.scene.registry.get('history')) {
            const historyStack = this.scene.registry.get('history')
            historyStack.push(key)
        }
        else {
            this.scene.registry.set('history', [key])
        }
        
        this.create()
    }

    create(): void {
        this.scene.add.image(MARGIN, MARGIN, 'icon', 'icon_white_arrow.png')
        this.backButtonHitbox = this.scene.add.rectangle(0 ,0 ,BACK_BUTTON_HITBOX_WIDTH, BACK_BUTTON_HITBOX_WIDTH)
        this.backButtonHitbox.setInteractive().on('pointerup', () => {
            this.scene.scene.stop()
            this.scene.scene.start(this.scene.registry.get('history').pop())
        })
    }

    getBody(): Phaser.GameObjects.Rectangle {
        return this.backButtonHitbox
    }
}