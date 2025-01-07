import { sdk } from '../sdk'

export const toggleCache = sdk.Action.withoutInput(
  // id
  'toggle-cache',

  // metadata
  async ({ effects }) => {
    const useCache = await sdk.store
      .getOwn(effects, sdk.StorePath.useCache)
      .const()

    return {
      name: useCache ? 'Disable Cache Relay' : 'Enable Cache Relay',
      description: useCache
        ? 'Do not use your local Nostr RS Relay service as a cache server for noStrudel'
        : 'Use your local Nostr RS Relay service as a cache server for noStrudel',
      warning: null,
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    const useCache = await sdk.store
      .getOwn(effects, sdk.StorePath.useCache)
      .const()

    await sdk.store.setOwn(effects, sdk.StorePath.useCache, !useCache)
  },
)
