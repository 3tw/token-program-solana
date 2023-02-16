import * as borsh from '@project-serum/borsh'

export class Student {
  name: string
  message: string

  constructor(name: string, message: string) {
    this.name = name
    this.message = message
  }

  studentSchema = borsh.struct([
    borsh.u8('variant'),
    borsh.str('name'),
    borsh.str('message'),
  ])

  serialize(): Buffer {
    const buffer = Buffer.alloc(1000) // Create large buffer first
    this.studentSchema.encode({ ...this, variant: 0 }, buffer)
    return buffer.subarray(0, this.studentSchema.getSpan(buffer)) // Return new buffer without the unused portion
  }
}
