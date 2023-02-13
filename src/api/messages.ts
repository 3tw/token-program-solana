import { Program, web3 } from '@project-serum/anchor'
import { AnchorWallet } from 'solana-wallets-vue'
import { TestProgram } from '~/types/program'

const {  programInterface, programId } = useConstants()

async function create(
  input: string,
  wallet: AnchorWallet,
  messageAccount: web3.Keypair,
  ) {
  const workspaceStore = useWorkspaceStore()
  const provider = workspaceStore.provider
  if (!provider) return

  const program = new Program(
    programInterface,
    programId,
    provider,
  ) as Program<TestProgram>

  try {
    const tx = await program.methods
      .createMessage(input)
      .accounts({
        message: messageAccount.publicKey,
        author: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([messageAccount])
      .rpc()

    const message = await program.account.message.fetch(
      messageAccount.publicKey,
    )
    console.log('Your transaction:')
    console.log(tx)
    console.log('messageAccount Data: ', message)
    return message
  } catch (err) {
    console.log('Transaction error: ', err)
    return
  }
}

async function update(
  input: string,
  wallet: AnchorWallet,
  messageAccount: web3.Keypair,
) {
  const workspaceStore = useWorkspaceStore()
  const provider = workspaceStore.provider
  if (!provider) return
  
  const program = new Program(
    programInterface,
    programId,
    provider,
  ) as Program<TestProgram>

  try {
    const tx = await program.methods
      .updateMessage(input)
      .accounts({
        message: messageAccount.publicKey,
        author: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc()

    const message = await program.account.message.fetch(
      messageAccount.publicKey,
    )
    console.log('Your transaction:')
    console.log(tx)
    console.log('messageAccount Data: ', message)
    return message
  } catch (err) {
    console.log('Transaction error: ', err)
    return
  }
}

export const messages = {
  create,
  update,
}
