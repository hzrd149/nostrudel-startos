import { setupManifest } from '@start9labs/start-sdk'

// @TODO
export const manifest = setupManifest({
  id: 'nostrudel',
  title: 'noStrudel',
  license: 'mit',
  wrapperRepo: 'https://github.com/hzrd149/nostrudel-startos',
  upstreamRepo: 'https://github.com/hzrd149/nostrudel',
  supportSite: 'https://github.com/hzrd149/nostrudel/issues',
  marketingSite: 'https://github.com/hzrd149/nostrudel',
  donationUrl: 'https://geyser.fund/project/nostrudel',
  description: {
    short: 'A simple web client focused on exploring nostr',
    long: `noStrudel is a web app for exploring the nostr protocol. The goal of this project is to build a nostr client that lets a user explore the nostr protocol by showing as much information as possible and letting the user view the underlying events.`,
  },
  assets: [],
  volumes: ['main'],
  images: {
    nostrudel: {
      source: {
        dockerTag: 'ghcr.io/hzrd149/nostrudel:0.42.0',
      },
    },
  },
  hardwareRequirements: {},
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
