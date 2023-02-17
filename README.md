## Solana Development Course Exercise - Vue3 App
This is an exercise from the [Solana development course](https://soldev.app/course). Unlike the course code, I finished the exercises in Vue3.
Key features of the app include connecting and interacting with the user's wallet, making calls to Solana program, fetching accounts, sorting them, and implementing search with pagination.

## Notes
One of the shortcomings of this app is that it relies on a third-party wallet provider ([solana-wallets-vue](https://github.com/lorisleiva/solana-wallets-vue)) to connect to a user's wallet.
The connection to the wallet is returned synchronously, preventing smooth routing UX. When the app is mounted we cannot wait this information in an asynchronous way, which may result in a flash of content.

### Goals
I would like to take a closer look at the [solana-wallets-vue](https://github.com/lorisleiva/solana-wallets-vue) to find out if we can find out if the wallet is  `connected` asynchronously.

## Setup
Install dependencies by running and starting the development server

```bash
npm install && npm run dev
```

### Alchemy
If you you're using [Alchemy](https://docs.alchemy.com/) to test your apps, you can simply copy the `.env.example` file and rename it to `.env`

```bash
cp .env.example .env
```

Now replace `<YOUR-API-KEY>` with Alchemy's app ID

```
VITE_PUBLIC_ALCHEMY_RPC_URL="https://solana-devnet.g.alchemy.com/v2/<YOUR-API-KEY>"
```

