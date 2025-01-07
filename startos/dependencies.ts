import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'
import { manifest } from './manifest'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const useCache = await sdk.store
    .getOwn(effects, sdk.StorePath.useCache)
    .const()

  if (useCache)
    return {
      'nostr-rs-relay': {
        kind: 'running',
        versionRange: '>=0.9.0:1',
        healthChecks: ['primary'],
      },
    } as T.CurrentDependenciesResult<typeof manifest>

  return {}
})
