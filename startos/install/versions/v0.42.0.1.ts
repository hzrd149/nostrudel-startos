import { VersionInfo, IMPOSSIBLE } from '@start9labs/start-sdk'
import { rmdir } from 'fs/promises'

export const v_0_4_2_0_1 = VersionInfo.of({
  version: '0.42.0:1',
  releaseNotes: 'Revamped for StartOS 0.3.6',
  migrations: {
    up: async ({ effects }) => {
      // remove old start9 dir
      await rmdir('/media/startos/volumes/main/start9')
    },
    down: IMPOSSIBLE,
  },
})
