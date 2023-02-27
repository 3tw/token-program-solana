## Solana Development Course Exercise - Vue3 App
This is an exercise from the [Solana development course](https://soldev.app/course).
I didn't use React dependencies as suggested in the course and tried to make it a Vue3 + Vite project. After struggling with Vite and several cruical dependecies for this project, I decided to remake it in Angular.

## Notes

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

