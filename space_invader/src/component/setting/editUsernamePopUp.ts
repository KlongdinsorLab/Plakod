//import { CIRCLE_GAUGE_MARGIN } from "config"
import i18next from "i18next"

export default class editUsernamePopUp {
    private scene : Phaser.Scene | undefined

    private username : string | undefined

    private usernameText : Phaser.GameObjects.Text 

    private editNameForm 

    private blackWindow : Phaser.GameObjects.Shape | undefined

    private special_char = ['ั','็','ิ','ี','ํ','ุ','ู','่','้','๊','๋','์']

    constructor(scene : Phaser.Scene, usernameText : Phaser.GameObjects.Text, username?: string) {
        const { width,height } = scene.scale
        this.username = username === undefined ? 'Player' : username

        this.scene = scene

        this.usernameText = usernameText

        // Black Screen When Pop Up
        this.blackWindow = scene.add.rectangle(0, 0, width, height, 0, 0.5).setOrigin(0, 0).setVisible(false)

        // Pop Up Form
        const self = this
        this.editNameForm = scene.add.dom( 72 , 345 )
            .setOrigin(0,0)
            .createFromCache('editnameForm')
        // Set I18n text
        const editNameText = <Element>this.editNameForm.getChildByID('edit_your_name')
        editNameText.textContent = i18next.t('edit_your_name')

        const cancelText = <Element>this.editNameForm.getChildByID('cancel')
        cancelText.textContent = i18next.t('cancel')

        const submitText = <Element>this.editNameForm.getChildByID('submit')
        submitText.textContent = i18next.t('submit_edit')

        this.editNameForm.addListener('click')
        this.editNameForm.on('click', function(event : any) {
            if(event.target.name === 'submit') {
                const inputUsername = <HTMLInputElement>self.editNameForm.getChildByID('namefield')
                const inputValue = inputUsername.value
                if (inputValue != ''){
                    self.updateUsername(inputValue ?? 'Player')
                }
                self.closeEditNamePopUp()
                self.editNameForm?.setVisible(false)
            }
            if(event.target.name === 'cancel'){
                
                self.closeEditNamePopUp()
                self.editNameForm?.setVisible(false)
            }
        })
        this.editNameForm.setVisible(false)

        this.updateUsername(this.username)
    }


    popUpEditName() : void {
        this.scene?.scene.pause()
        this.editNameForm?.setVisible(true)
        this.blackWindow?.setVisible(true)

        // Set default value
        const namefieldValue = <HTMLInputElement>this.editNameForm?.getChildByName('namefield')
        namefieldValue.value = this.username ?? 'Player'
    }

    closeEditNamePopUp() : void {
        //this.setInteractiveOn()
        this.blackWindow?.setVisible(false)

        this.scene?.scene.resume()
    }

    updateUsername(username : string) : void{
        if(this.getLength(username) > 12) {
            this.usernameText?.setFontSize(32 - this.getLength(username) + 9)
        }
        else {
            this.usernameText?.setFontSize(32)
        }

        this.usernameText?.setText(username)
        this.username = username
    }

    getUsername() : string {
        return this.username === undefined ? 'Player' : this.username
    }

    getLength(text : string) : number {
        let count = 0
        for(const char of text) {
            if (! this.special_char.includes(char)) {
                count++
            }
        }
        return count
    }
}