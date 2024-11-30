// LaserFactoryByName.ts
import { SingleLaserFactory } from './SingleLaserFactory'
import { TripleLaserFactory } from './TripleLaserFactory'

export const LaserFactoryByName = {
	single: SingleLaserFactory,
	triple: TripleLaserFactory,
}
