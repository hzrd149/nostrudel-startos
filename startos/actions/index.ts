import { sdk } from '../sdk'
import { toggleCache } from './toggleCache'

export const actions = sdk.Actions.of().addAction(toggleCache)
