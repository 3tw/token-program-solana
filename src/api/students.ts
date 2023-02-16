import {
  Transaction,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js'
import { useWallet } from 'solana-wallets-vue'
import { Student } from '~/components/students/student'

/* Common */
const { STUDENT_INTRO_PROGRAM_ID } = useConstants()
const { connection } = useWorkspace()

async function create(student: Student, userPubkey: PublicKey) {
  if (!userPubkey) return

  const buffer = student.serialize()
  const transaction = new Transaction()
  const programId = new PublicKey(STUDENT_INTRO_PROGRAM_ID)

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
  } catch (error) {
    console.log('Transaction failed: ', JSON.stringify(error))
  }
}

async function getList() {
  const programId = new PublicKey(STUDENT_INTRO_PROGRAM_ID)
  try {
    const result = await connection.getProgramAccounts(programId)
    return result.map((account) => Student.deserialize(account.account.data))
  } catch (error) {
    console.log('Get program accounts error: ', error)
  }
}

export default {
  create,
  getList,
}
