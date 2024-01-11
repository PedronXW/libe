import { HashComparer } from '@/domain/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/application/cryptography/hash-generator'
import { compare, hash } from 'bcrypt'

export class Crypto implements HashGenerator, HashComparer {
  async hash(plain: string): Promise<string> {
    return await hash(plain, 8)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await compare(value, hash)
  }
}
