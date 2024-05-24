import Phaser from 'phaser';
import i18next from "i18next";
import I18nSingleton from 'i18n/I18nSingleton'
import {setCookie } from 'typescript-cookie'
import WebFont from 'webfontloader';

interface DOMEvent<T extends EventTarget> extends Event {
	readonly target: T
}

export default class ConfirmScene extends Phaser.Scene {
    private selectedData: { age: string, gender: string, airflow: string, difficulty: string } | undefined;

    constructor() {
        super('confirm');
    }
    init(data: { age: string; gender: string; airflow: string; difficulty: string }) {
        this.selectedData = data;
    }
    

    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.html('confirmForm', 'html/auth/confirm.html');
    }

    create() {
        const i18n = I18nSingleton.getInstance();
        i18n.createTranslatedText( this, 100, 680 -3, "use_button" )
            .setFontSize(32)
            .setPadding(0,20,0,10)
            .setStroke("#9E461B",6)
            .setColor("#FFFFFF")
            .setOrigin(0.5,0.5)
            .setVisible(false)
        
        
        WebFont.load({
			google: {
				families: ['Sarabun:300,400,500']
			},
			active: () => {
				applyFontStyles();
			}
		});
		
		function applyFontStyles(): void {
			const lightElements = document.querySelectorAll('.sarabun-light');
			lightElements.forEach(element => {
				(element as HTMLElement).style.fontFamily = 'Sarabun, sans-serif';
				(element as HTMLElement).style.fontWeight = '300';
			});
		
			const mediumElements = document.querySelectorAll('.sarabun-medium');
			mediumElements.forEach(element => {
				(element as HTMLElement).style.fontFamily = 'Sarabun, sans-serif';
				(element as HTMLElement).style.fontWeight = '400';
			});
		
			const regularElements = document.querySelectorAll('.sarabun-regular');
			regularElements.forEach(element => {
				(element as HTMLElement).style.fontFamily = 'Sarabun, sans-serif';
				(element as HTMLElement).style.fontWeight = '500';
			});
		}

        const { width, height } = this.scale;
        if (!this.selectedData) {
            console.error('No data received in ConfirmScene');
        }
        // Set up the scene elements and logic
        const element = this.add
			.dom(width/2,height/2)
			.createFromCache('confirmForm')
			.setScale(1)

        
        //change language
        const headText = <Element>element.getChildByID('head-text');
		headText.textContent = i18next.t('confirm_title');

		const ageLabel = <Element>element.getChildByID('age-label');
		ageLabel.textContent = i18next.t('register_age_title');

		const genderLabel = <Element>element.getChildByID('gender-label');
		genderLabel.textContent = i18next.t('register_gender_title');

		const airflowLabel = <Element>element.getChildByID('airflow-label');
		airflowLabel.textContent = i18next.t('register_airflow_title');

		const difficultyLabel = <Element>element.getChildByID('difficulty-label');
		difficultyLabel.textContent = i18next.t('register_difficulty_title');

        const warningText = <Element>element.getChildByID('warning-text');
		warningText.textContent = i18next.t('register_warning');

        const confirmButton = <Element>element.getChildByID('confirm-button');
		confirmButton.textContent = i18next.t('confirm_confirm_button');

        const editButton = <Element>element.getChildByID('edit-button');
        editButton.textContent = i18next.t('confirm_edit_button');

        // Set the data to the form
        
        const ageInput = element.getChildByID('age') as HTMLInputElement;
        ageInput.textContent = this.selectedData!.age;

        const genderInput = element.getChildByID('gender') as HTMLInputElement;
        if(this.selectedData!.gender === 'male'){
            genderInput.textContent = i18next.t('register_option_male');
        }else if(this.selectedData!.gender === 'female'){
            genderInput.textContent = i18next.t('register_option_female');
        }else if(this.selectedData!.gender === 'other'){
            genderInput.textContent = i18next.t('register_option_other');
        }

        const airflowInput = element.getChildByID('airflow') as HTMLInputElement;
        airflowInput.textContent = this.selectedData!.airflow;

        const difficultyInput = element.getChildByID('difficulty') as HTMLInputElement;
        if(this.selectedData!.difficulty.trim() === '1'){
            difficultyInput.textContent = i18next.t('register_option_easy');
        }else if(this.selectedData!.difficulty.trim() === '2'){
            difficultyInput.textContent = i18next.t('register_option_medium');
        }else if(this.selectedData!.difficulty.trim() === '3'){
            difficultyInput.textContent = i18next.t('register_option_hard');
        }

    

        

        element.addListener('click')
		element.on('click', (event: DOMEvent<HTMLInputElement>) => {
			event.preventDefault()
			if (event?.target?.id === 'edit-button') {
                console.log('Edit button submitted in ConfirmScene');
                console.log('Gender from textContent:', genderInput.textContent);
				// TODO
				this.scene.stop()
                this.scene.launch('register',{age: ageInput.textContent
                    , gender: this.selectedData?.gender
                    , airflow: airflowInput.textContent
                    , difficulty: this.selectedData?.difficulty
                    , edit:true})
			}else if(event?.target?.id === 'confirm-button'){
                setCookie('scene', 'confirmScene', { expires: 7, path: '' });
                alert('ลงทะเบียนเสร็จสิ้น');
            }
		})

    }
    update() {
        // Update the scene state every frame
    }
}