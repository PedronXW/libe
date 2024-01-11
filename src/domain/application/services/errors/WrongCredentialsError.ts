import { ServiceError } from '@/core/errors/use-case-error'

export class WrongCredentialError extends Error implements ServiceError {
  constructor() {
    super(`Wrong credentials`)
  }
}
