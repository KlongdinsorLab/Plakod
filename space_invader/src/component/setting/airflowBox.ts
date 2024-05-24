import editAirflowPopUp from "./editAirflowPopUp";

export default class airflowBox {

    // Airflow Box
    private airflowBox : Phaser.GameObjects.Graphics | undefined
    private airflowText : Phaser.GameObjects.Text | undefined
    private editAirflowPopUp : editAirflowPopUp | undefined

    // private editAirflowIcon : Phaser.GameObjects.Image | undefined

    constructor(scene : Phaser.Scene){
        const { width } = scene.scale

        // Airflow Box
        this.airflowBox = scene.add.graphics()
        this.airflowBox.fillStyle(0xFFFFFF)
        this.airflowBox.fillRoundedRect( width/2 - 164, 920, 328, 56 )
        this.airflowBox.lineStyle(1, 0x727272)
        this.airflowBox.strokeRoundedRect( width/2 - 164, 920, 328, 56 )
        this.airflowBox.setInteractive(new Phaser.Geom.Rectangle(width/2 - 164, 920, 328, 56), Phaser.Geom.Rectangle.Contains)
            .on('pointerdown', () => this.popUpEditAirflow())

        // Edit Airflow Icon
        scene.add.image(width/2 + 164 - 20, 920 + 28, "sheet", "logo_setting_edit airflow.png")
            // .setInteractive().on('pointerdown', () => this.popUpEditAirflow())
            .setOrigin(1,0.5) // Guessed the coordinate

        // Airflow Number
        this.airflowText = scene.add.text(width/2, 920 + 28, "")
            .setFontSize(32)
            .setColor("#57453B")
            .setOrigin(0.5,0.5)

        // Don't forget to initiate airflow text

        this.editAirflowPopUp = new editAirflowPopUp(scene, this.airflowText)

        this.airflowText.setText(this.editAirflowPopUp.getAirflow().toString())

    }

    popUpEditAirflow() {
        this.editAirflowPopUp?.popUpEditAirflow1()
    }

    setFont(style : any) : void {
        this.airflowText?.setStyle(style)
    }
}