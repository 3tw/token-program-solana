
This is a [Vue 3](https://github.com/vuejs/core) Solana template. It can be used on its own or inside [Anchor](https://github.com/coral-xyz/anchor) framework.

This app provides a [Pinia](https://pinia.vuejs.org/) store that integrates [solana-wallets-vue](https://github.com/lorisleiva/solana-wallets-vue) and creates an connection with Solana [devnet cluster](https://docs.solana.com/clusters) out of the box.

The template also comes with a demo program (test_program) that allows you to write and update messages. Use it as an example of how your frontend code can communicate with a deployed Solana program. (Please note that this demo program may not work in the future and is intended for demonstration purposes only.)


## Features
- [Solana wallets for Vue](https://github.com/lorisleiva/solana-wallets-vue)
- [Vite](https://github.com/vitejs/vite).
- [File based routing](https://github.com/hannoeru/vite-plugin-pages)
- [Auto imported components ](https://github.com/antfu/unplugin-vue-components)
- [Pinia State Management](https://pinia.vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)

## Setup
You can use this template on its own or inside Anchor application. Simply copy this repository and run

```bash
npm install && npm run dev
```

If you are using it inside Anchor, paste this repo inside `/app` directory and you are ready to go.