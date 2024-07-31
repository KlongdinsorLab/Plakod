import I18nSingleton from "i18n/I18nSingleton";
import { Popup } from "./Popup";
export class RewardPopup extends Popup{
    private characterId!: number
    private layer!: Phaser.GameObjects.Layer
    private screenOverlay!: Phaser.GameObjects.Rectangle
    private screenOverlayHitBox!: Phaser.GameObjects.Rectangle
    private characterImage!: Phaser.GameObjects.Image
    private characterName!: Phaser.GameObjects.Text
    private characterAura!: Phaser.GameObjects.Image
    private rewardBanner!: Phaser.GameObjects.NineSlice
    private rewardBannerText!: Phaser.GameObjects.Text
    private rewardPopupIcon!: Phaser.GameObjects.Image
    private rewardPopupText!: Phaser.GameObjects.Text
    private rewardPopupButtonToSetting!: Phaser.GameObjects.NineSlice
    private rewardPopupButtonToSettingText!: Phaser.GameObjects.Text
    private rewardPopupButtonClose!: Phaser.GameObjects.NineSlice
    private rewardPopupButtonCloseText!: Phaser.GameObjects.Text


    constructor(scene: Phaser.Scene, characterId: number){
        super(scene)
        this.characterId = characterId
    }
    create(): void {
        this.layer = this.scene.add.layer()
        this.screenOverlayHitBox = this.scene.add.rectangle(
            0,
            0,
            this.scene.scale.width,
            this.scene.scale.height,
        )
        .setOrigin(0)
        .setInteractive().on('pointerup', () =>{})
        this.layer.add(this.screenOverlayHitBox)

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

        this.rewardPopupIcon = this.scene.add.image(
            this.scene.scale.width/2, 
            112, 
            'icon', 
            'icon_achievement.png'
        ).setScale(2.5)
        this.layer.add(this.rewardPopupIcon)


        this.rewardBanner = this.scene.add.nineslice(
            this.scene.scale.width / 2,
            232,
            'heading', 
            'heading_green.png', 
            528, 
            128
        )
        this.layer.add(this.rewardBanner)

        this.rewardBannerText = I18nSingleton.getInstance()
        .createTranslatedText(
            this.scene, 
            this.scene.scale.width/2, 
            214, 
            'popup_reward_title',
        )
        .setAlign('center')
        .setOrigin(0.5)
        .setColor('#FFFFFF')
        .setStroke('#327F76', 12)
        .setFontSize(42)
        this.layer.add(this.rewardBannerText)



        this.rewardPopupText = I18nSingleton.getInstance()
        .createTranslatedText(
            this.scene, 
            this.scene.scale.width/2, 
            396, 
            'popup_reward_text',
        ).setOrigin(0.5)
        .setFontSize(40)
        .setColor('#FFFFFF')
        .setStroke('#327F76', 12)
        this.layer.add(this.rewardPopupText)

        this.characterAura = this.scene.add.image(
            this.scene.scale.width/2, 
            672, 
            'popupAuraEffect'
        )
        this.layer.add(this.characterAura)

        //todo: add character image
        this.characterImage = this.scene.add.image(
            this.scene.scale.width/2, 
            674, 
            `mc${this.characterId}`,
            `mc${this.characterId}_normal_00001.png`
        ).setScale(1.5)
        this.layer.add(this.characterImage)

        const characterNameKey = `popup_reward_character_${this.characterId}`

        this.characterName = I18nSingleton.getInstance()
        .createTranslatedText(
            this.scene, 
            this.scene.scale.width/2, 
            912, 
            characterNameKey,
        ).setOrigin(0.5)
        .setFontSize(40)
        .setColor('#FFFFFF')
        .setStroke('#327F76', 12)
        this.layer.add(this.characterName)

        this.rewardPopupButtonToSetting = this.scene.add.nineslice(
            this.scene.scale.width / 2,
            1074,
            'button', 
            'button_red.png', 
            376, 
            96,
            32,32,64,64
        ).setOrigin(0.5)
        this.rewardPopupButtonToSetting.setInteractive().on('pointerup', () => {
            this.destroy()
            this.scene.scene.start('setting', {characterId: this.characterId})
        })
        this.layer.add(this.rewardPopupButtonToSetting)

        this.rewardPopupButtonToSettingText = I18nSingleton.getInstance()
        .createTranslatedText(
            this.scene,
            this.scene.scale.width / 2,
            1080,
            'popup_reward_button_goto_setting',
        ).setOrigin(0.5)
        .setFontSize(32)
        .setColor('#FFFFFF')
        .setStroke('#9E461B', 6)
        this.layer.add(this.rewardPopupButtonToSettingText)

        this.rewardPopupButtonClose = this.scene.add.nineslice(
            this.scene.scale.width / 2,
            1194,
            'button', 
            'button_grey.png', 
            376, 
            96,
            32,32,64,64
        ).setOrigin(0.5)
        this.rewardPopupButtonClose.setInteractive().on('pointerup', () => {
            this.destroy()
        })
        this.layer.add(this.rewardPopupButtonClose)

        this.rewardPopupButtonCloseText = I18nSingleton.getInstance()
        .createTranslatedText(
            this.scene,
            this.scene.scale.width / 2,
            1194,
            'popup_reward_button_close',
        ).setOrigin(0.5)
        .setFontSize(32)
        .setColor('#FFFFFF')
        .setStroke('#7A7367', 6)

        this.layer.add(this.rewardPopupButtonCloseText)

        this.layer.setDepth(1)
    }
    initFontStyle():void{
        this.rewardBannerText.setStyle({
            fontFamily: 'Mali',
        })
        this.rewardPopupText.setStyle({
            fontFamily: 'Mali',
        })
        this.characterName.setStyle({
            fontFamily: 'Mali',
        })
        this.rewardPopupButtonToSettingText.setStyle({
            fontFamily: 'Mali',
        })
        this.rewardPopupButtonCloseText.setStyle({
            fontFamily: 'Mali',
        })
    }
    destroy(): void {
        this.layer.destroy()
    }
}