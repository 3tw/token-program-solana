import { Transaction, Keypair, PublicKey, SystemProgram } from '@solana/web3.js'
import * as token from '@solana/spl-token'
import { useWallet } from 'solana-wallets-vue'
import { logTransaction } from './common'

const { connection } = useWorkspace()

async function createMint(userPubkey: PublicKey, decimals: number) {
  try {
    const lamports = await token.getMinimumBalanceForRentExemptMint(connection)
    const mintAccount = Keypair.generate()
    const tokenProgramId = token.TOKEN_PROGRAM_ID

    const transaction = new Transaction().add(
      // Signed by user
      SystemProgram.createAccount({
        fromPubkey: userPubkey,
        newAccountPubkey: mintAccount.publicKey,
        space: token.MINT_SIZE,
        lamports,
        programId: tokenProgramId,
      }),
      // Signed by user and mint account
      token.createInitializeMintInstruction(
        mintAccount.publicKey,
        decimals,
        userPubkey,
        userPubkey,
        tokenProgramId,
      ),
    )

    const { sendTransaction } = useWallet()
    const txId = await sendTransaction(transaction, connection, {
      signers: [mintAccount], // Mint account is also the signer! (Wallet is included in the sendTransaction function)
    })
    logTransaction(txId)
    return {
      mintPubkeyString: mintAccount.publicKey.toString(),
    }
  } catch (error) {
    console.log(`Create Mint error: ${error}`)
    return {
      mintPubkey: null,
      message: 'Create Mint error: ' + error,
    }
  }
}

async function createAssociatedTokenAccount(
  userPubkey: PublicKey,
  mintPubkey: PublicKey,
) {
  try {
    const associatedTokenAddress = await token.getAssociatedTokenAddress(
      mintPubkey,
      userPubkey,
      false,
    )
    const transaction = new Transaction().add(
      token.createAssociatedTokenAccountInstruction(
        userPubkey,
        associatedTokenAddress,
        userPubkey,
        mintPubkey,
      ),
    )

    const { sendTransaction } = useWallet()
    const txId = await sendTransaction(transaction, connection)
    logTransaction(txId)
    return associatedTokenAddress
  } catch (error) {
    console.log(`Create Associated Account error: ${error}`)
    return ''
  }
}

async function mintTokens(
  mint: PublicKey,
  destination: PublicKey, // Token Account !
  authority: PublicKey,
  amount: number,
) {
  try {
    const transaction = new Transaction().add(
      token.createMintToInstruction(mint, destination, authority, amount),
    )
    const { sendTransaction } = useWallet()
    const txId = await sendTransaction(transaction, connection)
    logTransaction(txId)
  } catch (error) {
    console.log(`Minting tokens to ${destination.toString()} failed: ${error}`)
  }
}

export default {
  createMint,
  createAssociatedTokenAccount,
  mintTokens,
}
