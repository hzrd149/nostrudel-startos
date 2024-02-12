// To utilize the default config system built, this file is required. It defines the *structure* of the configuration file. These structured options display as changeable UI elements within the "Config" section of the service details page in the StartOS UI.

import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "enable-cache-relay": {
    name: "Use local relay for caching",
    description:
      "If you enable the option, noStrudel will cache Nostr events on your personal Nostr relay, which is fast and makes the cache available to all your logged in clients. If you disable this option, noStrudel will instead cache Nostr events in the browser's storage, which is slower and does not sync across clients.",
    type: "boolean",
    default: false,
  },
  "cache-relay": {
    name: "Cache Relay",
    description: "A local relay to use for caching events",
    type: "pointer",
    subtype: "package",
    "package-id": "nostr",
    target: "lan-address",
    interface: "websocket",
  },
});
