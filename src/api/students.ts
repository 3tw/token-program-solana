import {
  Transaction,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js'
import { useWallet } from 'solana-wallets-vue'
import bs58 from 'bs58'
import { Student } from '~/components/students/student'

/* Common */
const { STUDENT_INTRO_PROGRAM_ID } = useConstants()
const { connection } = useWorkspace()
const programId = new PublicKey(STUDENT_INTRO_PROGRAM_ID)

async function create(student: Student, userPubkey: PublicKey) {
  if (!userPubkey) return

  // Find pda; make sure to use the correct seeds
  const [pda] = await PublicKey.findProgramAddressSync(
    [userPubkey.toBuffer()],
    programId,
  )
  const buffer = student.serialize()
  const transaction = new Transaction()

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

async function getAccount(userPubkey: PublicKey) {
  const [pda] = await PublicKey.findProgramAddressSync(
    [userPubkey.toBuffer()],
    programId,
  )
  const result = await connection.getAccountInfo(pda)
  if (!result?.data) return
  return Student.deserialize(result?.data)
}

/**
 * Get accounts + names of the student to sort it - leave messages out to reduce payload.
 *
 * Offset = 1, because first byte (u8 = 1 byte) of data is taken by 'variant': u8
 * Length = 18, to be sure we cover most names, without fetching too much data
 *
 * If we would discard sorting, accounts PublicKeys would suffice: we would use { offset: 0, length: 0 }
 * */
async function getAccounts(search: string) {
  try {
    const data = await connection.getProgramAccounts(programId, {
      dataSlice: { offset: 1, length: 18 },
      filters:
        search.trim() === ''
          ? []
          : [
              {
                memcmp: {
                  offset: 5, //The offset to the name fields is 1 + first 4 bytes are the length of the name => total offset 5
                  bytes: bs58.encode(Buffer.from(search)),
                },
              },
            ],
    })

    data.sort((a, b) => {
      const lengthA = a.account.data.readUInt32LE(0)
      const lengthB = b.account.data.readUInt32LE(0)

      /**
       * The first 4 bytes of a dynamic field in Borsh are used to store the length of the field in bytes.
       * The string portion is therefore data.slice(4, 4 + data[0]).
       */
      const dataA = a.account.data.subarray(4, 4 + lengthA)
      const dataB = b.account.data.subarray(4, 4 + lengthB)
      return dataA.compare(dataB)
    })
    return data.map((account) => account.pubkey)
  } catch (error) {
    console.log('Get accounts error: ', error)
    return []
  }
}

async function getList(
  accounts: PublicKey[],
  page: number,
  perPage: number,
): Promise<Student[]> {
  const paginatedPublicKeys = accounts.slice(
    page * perPage,
    (page + 1) * perPage,
  )
  if (!paginatedPublicKeys.length) return []
  try {
    const selectedAccounts = await connection.getMultipleAccountsInfo(
      paginatedPublicKeys,
    )

    /**
     * There are some accounts data storing empty strings.
     * Filtering them out is easy, maintaining the correct pagination is a of a nuisance.
     * I decided to leave this UI problem aside.
     * In production, you would want the program itself to prevent empty entries.
     * */

    const students = selectedAccounts.reduce((acc: Student[], account) => {
      if (!account?.data) return acc
      const student = Student.deserialize(account?.data)
      if (!student) return acc
      return [...acc, student]
    }, [])
    return students
  } catch (error) {
    console.log('Get page error: ', error)
    return []
  }
}

export default {
  create,
  getList,
  getAccount,
  getAccounts,
}
