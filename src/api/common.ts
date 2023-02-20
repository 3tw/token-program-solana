export function logTransaction(txId: string) {
  console.log(
    `Transaction submitted: https://explorer.solana.com/tx/${txId}?cluster=devnet`,
  )
}
