import * as borsh from '@project-serum/borsh'

export class Student {
  name: string
  message: string

  constructor(name: string, message: string) {
    this.name = name
    this.message = message
  }

  instructionSchema = borsh.struct([
    borsh.u8('variant'),
    borsh.str('name'),
    borsh.str('message'),
  ])

  serialize(): Buffer {
    const buffer = Buffer.alloc(1000) // Create large buffer first
    this.instructionSchema.encode({ ...this, variant: 0 }, buffer)
    return buffer.subarray(0, this.instructionSchema.getSpan(buffer)) // Return new buffer without the unused portion
  }

  // Static, since they will never be called on an instance
  static accountSchema = borsh.struct([
    borsh.u8('initialized'),
    borsh.str('name'),
    borsh.str('message'),
  ])
  static deserialize(buffer: Buffer): Student | null {
    if (!buffer) return null
    try {
      const { name, message } = this.accountSchema.decode(buffer)
      return new Student(name, message)
    } catch (error) {
      console.log('Deserialize error:', error)
      return null
    }
  }
}
