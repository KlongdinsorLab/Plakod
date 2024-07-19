import editAirflowPopUp from "./editAirflowPopUp";

export default class airflowBox {

    // Airflow Box
    private airflowBox : Phaser.GameObjects.Graphics | undefined
    private airflowText : Phaser.GameObjects.Text | undefined
    private editAirflowPopUp : editAirflowPopUp | undefined
    private airflowNumber: number;

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
            .on('pointerup', () => this.popUpEditAirflow())

        // Edit Airflow Icon
        scene.add.image(width/2 + 164 - 20, 920 + 28, "sheet", "logo_setting_edit airflow.png")
            // .setInteractive().on('pointerup', () => this.popUpEditAirflow())
            .setOrigin(1,0.5) // Guessed the coordinate

        // Airflow Number
        this.airflowNumber = scene.registry.get("airflow");
        this.airflowText = scene.add.text(width/2, 920 + 28, this.airflowNumber.toString())
            .setFontSize(32)
            .setColor("#57453B")
            .setOrigin(0.5,0.5)

    }

    createPopUp(scene : Phaser.Scene){
        const {width} = scene.scale

        this.editAirflowPopUp = new editAirflowPopUp(
            scene, 
            this.airflowText ?? scene.add.text(width/2, 920 + 28, "")
                .setFontSize(32)
                .setColor("#57453B")
                .setOrigin(0.5,0.5),
            this.airflowNumber
            );

        this.airflowText?.setText(this.editAirflowPopUp.getAirflow().toString())
    }

    popUpEditAirflow() {
        this.editAirflowPopUp?.popUpEditAirflow1()
    }

    setFont(style : any) : void {
        this.airflowText?.setStyle(style)
    }
}