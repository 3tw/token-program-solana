import {
  Transaction,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js'
import { useWallet } from 'solana-wallets-vue'
import { Student } from '~/components/students/student'

const { STUDENT_INTRO_PROGRAM_ID } = useConstants()
const { connection } = useWorkspace()

async function create(student: Student, userPubkey: PublicKey) {
  if (!userPubkey) return

  const programId = new PublicKey(STUDENT_INTRO_PROGRAM_ID)
  const buffer = student.serialize()
  const transaction = new Transaction()
  
  // Find pda; make sure to use the correct seeds
  const [pda] = await PublicKey.findProgramAddressSync(
    [userPubkey.toBuffer()],
    programId,
  )

  const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: userPubkey,
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: pda,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
    ],
    data: buffer,
    programId: programId,
  })
  transaction.add(instruction)

  try {
    const { sendTransaction } = useWallet()
    const txId = await sendTransaction(transaction, connection)
    console.log(
      `Transaction submitted: https://explorer.solana.com/tx/${txId}?cluster=devnet`,
    )
  } catch (e) {
    alert(JSON.stringify(e))
  }
}

export const message = {
  create,
}
