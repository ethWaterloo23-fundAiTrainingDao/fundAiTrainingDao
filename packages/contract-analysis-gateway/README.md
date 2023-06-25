# Gateway

This is a proxy to the [contract-analysis service](../contract-analysis/README.md).

Run `yarn keygen` to generate a keypair for the gateway.

## How it works

The gateway is a simple proxy that forwards requests to the contract-analysis service. It is used to avoid privacy issues of knowing where the contract-analysis service is running.

This service listens on xmtp and forwards requests to the contract-analysis service on a POST request.

The response is then forwarded back to the client over xmtp again.

https://github.com/xmtp/xmtp-bot-starter 

