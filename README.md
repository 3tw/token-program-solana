
This is a [Vue3](https://github.com/vuejs/core) template for client interaction with Solana network. It can be used on its own or inside [Anchor](https://github.com/coral-xyz/anchor) framework.

It comes with [Pinia](https://pinia.vuejs.org/) store that implements [solana-wallets-vue](https://github.com/lorisleiva/solana-wallets-vue) and creates a connection with Solana [devnet cluster](https://docs.solana.com/clusters) out of the box. 
The template also comes with a demo program (test_program) that allows you to write and update messages. Use it as an example of how your frontend code can communicate with a deployed Solana program. (Please note that this demo program may not work in the future and is intended for demonstration purposes only.)


## Features
- [Solana wallets for Vue](https://github.com/lorisleiva/solana-wallets-vue)
- [Alchemy](https://docs.alchemy.com/)
- [Vue3](https://vuejs.org/)
- [Typescript](https://vuejs.org/guide/typescript/overview.html)
- [Vite](https://github.com/vitejs/vite)
- [Pinia State Management](https://pinia.vuejs.org/)
- [File based routing](https://github.com/hannoeru/vite-plugin-pages)
- [Auto imported components ](https://github.com/antfu/unplugin-vue-components)
- [TailwindCSS](https://tailwindcss.com/)

## Setup
You can use this template on its own or inside Anchor application. Simply copy this repository and run

```bash
npm install && npm run dev
```

If you are using it inside Anchor, paste this repo inside `/app` directory and you are ready to go.

### Alchemy
If you you'are using [Alchemy](https://docs.alchemy.com/) to test your apps, you can simply copy `.env.example` file and rename it to `.env`

```bash
cp .env.example .env
```

Now replace `<YOUR-API-KEY>` with Alchemy's app ID

```
VITE_PUBLIC_ALCHEMY_RPC_URL="https://solana-devnet.g.alchemy.com/v2/<YOUR-API-KEY>"
```

