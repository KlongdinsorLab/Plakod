import * as Sentry from '@sentry/browser'

export enum LogLevel {
	ERROR = 0,
	WARN = 1,
	INFO = 2,
	VERBOSE = 3,
	DEBUG = 4,
}

export class Logger {
	private logLevel: LogLevel

	constructor(level: LogLevel = LogLevel.INFO) {
		this.logLevel = level
	}

	private shouldLog(level: LogLevel): boolean {
		return level <= this.logLevel
	}

	private formatMessage(
		scene: string,
		message: string,
		level: LogLevel,
	): string {
		const timestamp = new Date().toISOString()
		return `[${timestamp}] | ${LogLevel[level]} | [Scene:${scene}]: ${message}`
	}

	public log(scene: string, message: string, level: LogLevel): void {
		if (this.shouldLog(level)) {
			const formattedMessage = this.formatMessage(scene, message, level)
			switch (level) {
				case LogLevel.ERROR:
					console.error(formattedMessage)
					Sentry.captureMessage(formattedMessage, 'error')
					break
				case LogLevel.INFO:
					console.log(formattedMessage)
					Sentry.captureMessage(formattedMessage, 'info')
					break
				case LogLevel.WARN:
					console.warn(formattedMessage)
					Sentry.captureMessage(formattedMessage, 'warning')
					break
				case LogLevel.VERBOSE:
					console.log(formattedMessage)
					Sentry.captureMessage(formattedMessage, 'info')
					break
				case LogLevel.DEBUG:
					console.log(formattedMessage)
					Sentry.captureMessage(formattedMessage, 'debug')
					break
			}
		}
	}

	public error(scene: string, message: string, error?: Error): void {
		this.log(
			scene,
			`${message}${error ? ` | ${error.message}` : ''}`,
			LogLevel.ERROR,
		)
	}

	public warn(scene: string, message: string): void {
		this.log(scene, message, LogLevel.WARN)
	}

	public info(scene: string, message: string): void {
		this.log(scene, message, LogLevel.INFO)
	}

	public verbose(scene: string, message: string): void {
		this.log(scene, message, LogLevel.VERBOSE)
	}

	public debug(scene: string, message: string): void {
		this.log(scene, message, LogLevel.DEBUG)
	}
}

const logLevel =
	LogLevel[import.meta.env.LOG_LEVEL as keyof typeof LogLevel] || LogLevel.INFO
export const logger = new Logger(logLevel)
