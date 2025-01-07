import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { readFile, rmdir } from 'fs/promises'
import { load } from 'js-yaml'
import { sdk } from '../sdk'

export const v03832 = VersionInfo.of({
  version: '0.38.3:2',
  releaseNotes: 'Revamped for StartOS 0.3.6',
  migrations: {
    up: async ({ effects }) => {
      const { 'enable-cache-relay': useCache } = load(
        await readFile('/root/start9/config.yaml', 'utf-8'),
      ) as { 'enable-cache-relay': boolean }

      await sdk.store.setOwn(effects, sdk.StorePath.useCache, useCache)

      // remove old start9 dir
      await rmdir('/data/start9')
    },
    down: IMPOSSIBLE,
  },
})
