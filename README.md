# $VIRGIN - LambosForVirgins

## Getting Started

Firstly, make sure you're using the project's node version by running:

```bash
nvm use
```

Then install the dependencies:

> We recommend using yarn because of it's cache optimization and dependency management. But if you prefer to fill your hard drive with node modules, then be sure to use `npm install` instead.

```bash
yarn
```

Finally, start the server with the same package manager you used to install dependencies:

```bash
yarn dev
# or
npm run dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

<details>
<summary>Jupiter API</summary>
<a href="https://station.jup.ag/docs/apis/swap-api">Official Documentation</a>
<p>
We use the Jupiter API to fetch token prices, generate a swap quote, and finally create a swap transaction for the user to sign in their wallet.
</p>
</details>

<details>
<summary>Raydium API</summary>
<a href="https://docs.raydium.io/raydium/traders/trade-api">Official Documentation</a>
<p>
We use the Raydium API to fetch token prices, generate a swap quote, and finally create a swap transaction for the user to sign in their wallet.
</p>
</details>

## Troubleshooting

### Anchor build - Lock file version

Anchor build fails with error:

```
Caused by: lock file version 4 requires `-Znext-lockfile-bump`
```

You can fix this simply by changing the version field of `Cargo.lock` like so:

```
- version = 4
+ version = 3
```