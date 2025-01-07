import { matches, FileHelper } from '@start9labs/start-sdk'
const { object } = matches

const shape = object({
  location: object({}),
})

export const nginxFile = FileHelper.yaml(
  '/etc/nginx/conf.d/default.conf',
  shape,
)
