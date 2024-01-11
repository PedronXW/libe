import { ServiceError } from '@/core/errors/use-case-error'

export class DeveloperNonExistsError extends Error implements ServiceError {
  constructor() {
    super(`Developer non exists`)
  }
}
