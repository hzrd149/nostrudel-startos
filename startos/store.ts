import { setupExposeStore } from '@start9labs/start-sdk'

export type Store = {
  useCache: boolean
}

export const exposedStore = setupExposeStore<Store>((pathBuilder) => [])
