//import I18nSingleton from "i18n/I18nSingleton";
import { Popup } from "./Popup";
export class AchievementPopup extends Popup{
    private achievementId : number

    private layer!: Phaser.GameObjects.Layer
    private screenOverlay!: Phaser.GameObjects.Rectangle

    private headText !: Phaser.GameObjects.Text
    private bannerText !: Phaser.GameObjects.Text
    private detailText !: Phaser.GameObjects.Text
    private buttonText !: Phaser.GameObjects.Text

    private achievementIcon !: Phaser.GameObjects.Image
    private popupAuraEffect !: Phaser.GameObjects.Image
    private banner !: Phaser.GameObjects.Image

    private submitButton !: Phaser.GameObjects.NineSlice

    constructor(scene: Phaser.Scene, achievementId : number){
        super(scene)
        this.achievementId = achievementId
    }
    create(): void {
        this.layer = this.scene.add.layer()

        this.screenOverlay = this.scene.add.rectangle(
            0,
            0,
            this.scene.scale.width,
            this.scene.scale.height,
            0x000000
        )
        .setOrigin(0)
        .setAlpha(0.9)
        this.layer.add(this.screenOverlay)

        // TODO I18n
        this.headText = this.scene.add.text(
            this.scene.scale.width/2,
            288,
            "ยินดีด้วยนะ!\nคุณปลดล็อครางวัล"
        )
        .setFontSize(40)
        .setColor("#FFFFFF")
        .setStroke("#3F088C",6)
        .setAlign("center")
        .setOrigin(0.5,0)
        this.layer.add(this.headText)

        this.popupAuraEffect = this.scene.add.image(
            this.scene.scale.width/2,
            430,
            "popupAuraEffect"
        )
        .setOrigin(0.5,0)
        this.layer.add(this.popupAuraEffect)

        this.achievementIcon = this.scene.add.image(
            this.scene.scale.width/2,
            484,
            "achievement",
            "achievement" + this.achievementId + ".png"
            // "achievement10.png"
        )
        .setScale(2,2)
        .setOrigin(0.5,0)
        this.layer.add(this.achievementIcon)

        this.banner = this.scene.add.image(
            this.scene.scale.width/2,
            656,
            "heading",
            "heading_green.png"
        )
        .setOrigin(0.5,0)
        this.layer.add(this.banner)

        // TODO I18n
        this.bannerText = this.scene.add.text(
            this.scene.scale.width/2,
            675,
            "ชื่อความสำเร็จ"
        )
        .setFontSize(28)
        .setColor("#FFFFFF")
        .setStroke("#327F76",12)
        .setOrigin(0.5,0)
        this.layer.add(this.bannerText)

        // TODO I18n
        this.detailText = this.scene.add.text(
            this.scene.scale.width/2,
            817,
            'อ่านรายละเอียดได้ที่ "รางวัล"'
        )
        .setFontSize(32)
        .setColor("#FFFFFF")
        .setStroke("#3F088C",6)
        .setOrigin(0.5,0)
        this.layer.add(this.detailText)

        this.submitButton = this.scene.add.nineslice(
            this.scene.scale.width/2,
            907,
            'button',
            'button_red.png',
            376,
            96,
            32,32,64,64
        )
        .setOrigin(0.5,0)
        this.submitButton.setInteractive().on("pointerup",() => {this.destroy()})
        this.layer.add(this.submitButton)

        // TODO I18n
        this.buttonText = this.scene.add.text(
            this.scene.scale.width/2,
            932,
            'ยืนยัน'
        )
        .setOrigin(0.5,0)
        .setFontSize(32)
        .setColor("#FFFFFF")
        .setStroke("#9E461B",6)
        this.layer.add(this.buttonText)
    }
    destroy(): void {
        this.layer.destroy()
    }
}