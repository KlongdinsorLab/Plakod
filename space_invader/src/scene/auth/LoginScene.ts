import Phaser from 'phaser'
import I18nSingleton from 'i18n/I18nSingleton'
import i18next from 'i18next'
import WebFont from 'webfontloader'

import {
	getAuth,
	signInWithPhoneNumber,
	RecaptchaVerifier,
	ConfirmationResult,
	setPersistence,
	browserSessionPersistence,
} from 'firebase/auth'
import { logger } from 'services/logger'

interface DOMEvent<T extends EventTarget> extends Event {
	readonly target: T
}
export default class LoginScene extends Phaser.Scene {
	private element!: Phaser.GameObjects.DOMElement
	private bgm?: Phaser.Sound.BaseSound

	constructor() {
		super('login')
	}

	init({ bgm }: { bgm: Phaser.Sound.BaseSound }) {
		this.bgm = bgm
	}

	preload() {
		this.load.script(
			'webfont',
			'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
		)
		this.load.html('loginForm', 'html/auth/login.html')
	}

	create() {
		const i18n = I18nSingleton.getInstance()

		WebFont.load({
			google: {
				families: ['Sarabun:300,400,500'],
			},
			active: () => {
				applyFontStyles()
			},
		})

		function applyFontStyles(): void {
			const lightElements = document.querySelectorAll('.sarabun-light')
			lightElements.forEach((element) => {
				;(element as HTMLElement).style.fontFamily = 'Sarabun, sans-serif'
				;(element as HTMLElement).style.fontWeight = '300'
			})

			const mediumElements = document.querySelectorAll('.sarabun-medium')
			mediumElements.forEach((element) => {
				;(element as HTMLElement).style.fontFamily = 'Sarabun, sans-serif'
				;(element as HTMLElement).style.fontWeight = '400'
			})

			const regularElements = document.querySelectorAll('.sarabun-regular')
			regularElements.forEach((element) => {
				;(element as HTMLElement).style.fontFamily = 'Sarabun, sans-serif'
				;(element as HTMLElement).style.fontWeight = '500'
			})
		}

		//const { width, height } = this.scale

		this.element = this.add
			.dom(0, 0)
			.createFromCache('loginForm')
			.setOrigin(0, 0)
		logger.debug(this.scene.key, 'Element added')
		i18n
			.createTranslatedText(this, 100, 680 - 3, 'use_button')
			.setFontSize(32)
			.setPadding(0, 20, 0, 10)
			.setStroke('#9E461B', 6)
			.setColor('#FFFFFF')
			.setOrigin(0.5, 0.5)
			.setVisible(false)

		this.element.addListener('submit')

		this.element.on('submit', async (event: DOMEvent<HTMLInputElement>) => {
			event.preventDefault()
			if (event?.target?.id === 'submit-form') {
				const phoneInput = <HTMLInputElement>(
					this.element.getChildByID('phoneNumber-input')
				)
				const phoneNumber = this.getPhoneNumber(phoneInput.value.trim())
				this.signIn(phoneNumber)
			}
		})
		const textElementIds = [
			'head-text',
			'login_description',
			'phoneNumber-text',
			'button',
		]

		const textElementKeys = [
			'login_title',
			'login_description',
			'login_input',
			'login_button',
		]

		textElementIds.forEach((id, index) => {
			const textElement = <Element>this.element.getChildByID(id)
			textElement.textContent = i18next.t(textElementKeys[index])
		})
	}

	update() {}

	getPhoneNumber(phoneNumber: string): string {
		if (!phoneNumber.startsWith('0')) return `+66${phoneNumber}`
		return `+66${phoneNumber.substring(1, phoneNumber.length)}`
	}

	async signIn(phoneNumber: string): Promise<void> {
		const auth = getAuth()
		auth.useDeviceLanguage()
		const recaptchaVerifier = new RecaptchaVerifier(auth, 'button', {
			size: 'invisible',
		})
		try {
			await setPersistence(auth, browserSessionPersistence)
		} catch (error) {
			logger.error(this.scene.key, `${error}`)

			const toast = <Element>this.element.getChildByID('toast')
			toast.innerHTML +=
				'<div class="bg-red-500 rounded-lg p-4 w-[680px] h-[75px] flex justify-center"><span class="text-3xl">เกิดข้อผิดพลาด</span></div>'
			setTimeout(() => {
				toast.innerHTML = ''
			}, 5000)
		}

		try {
			const confirmationResult: ConfirmationResult =
				await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
			this.element.destroy()
			this.scene.launch('otp', {
				confirmationResult: confirmationResult,
				data: { phoneNumber: phoneNumber },
				bgm: this.bgm,
			})
		} catch (e) {
			logger.error(this.scene.key, `${e}`)

			const toast = <Element>this.element.getChildByID('toast')
			toast.innerHTML +=
				'<div class="bg-red-500 rounded-lg p-4 w-[680px] h-[75px] flex justify-center"><span class="text-3xl">เกิดข้อผิดพลาด</span></div>'
			setTimeout(() => {
				toast.innerHTML = ''
			}, 5000)
		}
	}
}
