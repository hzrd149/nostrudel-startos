## Using noStrudel

- Click `launch UI` to access your personal noStrudel client
- Create a new account or access an existing account by using a nip-07 browser extension. If creating a new account, be sure to securely back up the private key, preferably using Vaultwarden on your Start9 server
- Select the relays you want to use to browse nostr or use your existing relays from other nostr apps

## Using Your Local Nostr RS Relay (Optional)

1. **Install Nostr RS Relay**:
   - If you have Nostr RS Relay installed, you're all set!

2. **Enable the "Use Local Relay for Caching" Option**:
   - In your settings, enable the option that says "Use local relay for caching."
   - This allows the relay to act as a cache.

3. **Set the Relay to "Public" Mode**:
   - Make sure the relay is configured in "Public" mode.
   - Otherwise, it will only cache your own events.

4. **Adjust the "Messages Per Second Limit"**:
   - For optimal performance, set the "Messages Per Second Limit" to a value greater than 1000.
   - NoStrudel writes a maximum of 1000 events per second to the cache.

That's it! Your local relay should now work effectively as a cache. 🚀