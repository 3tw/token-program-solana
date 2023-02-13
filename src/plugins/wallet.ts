import SolanaWallets from 'solana-wallets-vue'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import 'solana-wallets-vue/styles.css'
import { UserModule } from '~/types/app'

export const install: UserModule = ({ app }) => {
  const walletOptions = {
    wallets: [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
    ],
    autoConnect: true,
  }
  app.use(SolanaWallets, walletOptions)
}
