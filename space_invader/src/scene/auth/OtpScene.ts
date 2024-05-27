import Phaser from 'phaser'
import I18nSingleton from 'i18n/I18nSingleton'
import i18next from 'i18next'
import {setCookie } from 'typescript-cookie'
import WebFont from 'webfontloader'

import {
	getAuth,
	signInWithPhoneNumber,
	RecaptchaVerifier,
	ConfirmationResult,
	setPersistence,
	browserSessionPersistence,
} from 'firebase/auth'

interface DOMEvent<T extends EventTarget> extends Event {
	readonly target: T
}
export default class OtpScene extends Phaser.Scene {
	private confirmationResult!: ConfirmationResult
	private phoneNumber!: string;
	private isTimeout: boolean = false;
	private isResend: boolean = false;
	private countdownInterval: number | undefined


	constructor() {
		super('otp')
	}

	init({ confirmationResult, data }: { confirmationResult: ConfirmationResult, data: { phoneNumber: string } }) {
		this.confirmationResult = confirmationResult;
		this.phoneNumber = data.phoneNumber;
	}
	
	preload() {
		this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
		this.load.html('otpForm', 'html/auth/otp.html')
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

		const { width, height } = this.scale


		const element = this.add
			.dom(width/2, height / 2)
			.createFromCache('otpForm')
			.setScale(1)
		console.log("otp scene added")

		const textElementIds = [
			'phoneNumber-text', 'otp-head-text', 'otp-description', 
			'otp-description-2', 'refcode', 'otp-timeout', 
			'resend-text', 'resend-text-button', 'confirm-button'
		];

		const textElementKeys = [
			`\n${this.phoneNumber}`, 'otp_title', 'otp_description', 
			'otp_description2', 'otp_refcode', 'otp_timeout', 
			'otp_resend', 'otp_resendButton', 'otp_button'
		];

		textElementIds.forEach((id, index) => {
			const textElement = <Element>element.getChildByID(id);
			textElement.textContent = i18next.t(textElementKeys[index]);
		});


		element.addListener('submit')
		element.on('submit', async (event: DOMEvent<HTMLInputElement>) => {
			event.preventDefault()
			if (event?.target?.id === 'submit-form') {
				let input = ''
				for (let i = 1; i <= 6; i++) {
					const inputElement = <HTMLInputElement>element.getChildByID(`otp${i}`)
					input = input + inputElement.value
				}
				this.verify(input)
			}
		})

		element.addListener('paste')
		element.on('paste', (event: ClipboardEvent) => {
			event.preventDefault()
			const paste = event?.clipboardData?.getData('text')
			if (!/^[0-9]{6}?$/.test(paste || '')) return
			for (let i = 1; i <= 6; i++) {
				const inputElement = <HTMLInputElement>element.getChildByID(`otp${i}`)
				inputElement.value = <string>paste?.substring(i - 1, i)
			}
		})

		element.addListener('input')
		element.on('input', (event: DOMEvent<HTMLInputElement>) => {
			const otpId = event.target.id
			const otpIndex = parseInt(otpId.substring('otp'.length, otpId.length))
			if (otpIndex > 6) return
			const nextIndex = event.target.value === '' ? otpIndex - 1 : otpIndex + 1
			const next = <HTMLInputElement>document.getElementById(`otp${nextIndex}`)
			try {
				next.focus()
				// eslint-disable-next-line no-empty
			} catch (e) {}
		})

		element.addListener('click');
		element.on('click', (event: DOMEvent<HTMLInputElement>) => {
			console.log(event.target.id);
			if(event.target.id === 'resend' || event.target.id === 'resend-text-button'){
				console.log('Resend');
				this.isResend = true;
				this.signIn(this.phoneNumber);
			}
		});

		//timeout
		this.SetCountDown();
		
	}

	update() {}

	async verify(code: string): Promise<void> {
		try {
			if(this.isTimeout){
				alert('Time out');
				this.scene.stop()
				this.scene.launch('login')
				return;
			}
			await this.confirmationResult.confirm(code)
			setCookie('phone', this.phoneNumber, { expires: 7, path: '' });
			setCookie('scene', 'otpScene', { expires: 7, path: '' });
			this.scene.stop()
			this.scene.launch('register')
		} catch (e){
			//TODO handle error
			console.log(e)
		}
	}

	async signIn(phoneNumber: string): Promise<void> {
		const auth = getAuth();
		auth.useDeviceLanguage();
		const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
			'size': 'invisible'
		});
		try {
			await setPersistence(auth, browserSessionPersistence)
		} catch (e) {
			console.log(e)
			// TODO
		}

		try {
			const confirmationResult: ConfirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
			setCookie('lastScene', 'otpScene', { expires: 7, path: '' });
			this.confirmationResult = confirmationResult;
			this.phoneNumber = phoneNumber;
			recaptchaVerifier.clear();
			this.isTimeout = false;
			this.SetCountDown();
			
			
		} catch (e) {
			// TODO handle ERROR Message
			// reset recaptcha
			console.log(e)
		}

	}

	//timeout
	SetCountDown() {
        // Clear any existing countdown interval to avoid multiple intervals running simultaneously
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval)
        }

        let counter = 60
        let min = 4

        const updateTimer = () => {
            if (counter > 0) {
                counter--
            } else {
                counter = 59
                min--
            }

            if (min === 0 && counter === 0) {
                this.isTimeout = true
                console.log("Time out")
                clearInterval(this.countdownInterval)
                return
            }

            const second = document.getElementById('second')! as HTMLElement
            second.style.setProperty('--value', counter.toString())
            const minute = document.getElementById('minute')! as HTMLElement
            minute.style.setProperty('--value', min.toString())
        }

        // Set a new interval
        this.countdownInterval = window.setInterval(updateTimer, 1000)
    }
	

}
