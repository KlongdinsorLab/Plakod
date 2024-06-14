import { MARGIN } from 'config'

export default class Menu {
  private menu!: Phaser.GameObjects.Image
  private layer: Phaser.GameObjects.Layer

  constructor(scene: Phaser.Scene, subSceneKeys?: string[]) {
    const { width } = scene.scale
    this.layer = scene.add.layer()
    this.menu = scene.add
      .image(width - MARGIN, MARGIN / 2, 'ui', 'pause.png')
      .setOrigin(1, 0)
    this.menu.setInteractive()
    this.menu.on('pointerup', () => {
      this.menu.setTexture('ui', 'play.png')
      if(subSceneKeys) {
        for(let i = 0; i < subSceneKeys.length; i++) {
          scene.scene.pause(subSceneKeys[i])
        }
      }
      scene.scene.pause()
      console.log(subSceneKeys)
      
      scene.scene.launch('pause', { menu: this.menu, sceneName: scene.scene.key, subSceneKeys: subSceneKeys })
    })
    this.layer.add(this.menu)
    this.layer.setDepth(10)
  }

  getBody(): Phaser.GameObjects.Image {
    return this.menu
  }

  getLayer(): Phaser.GameObjects.Layer {
    return this.layer
  }
}
