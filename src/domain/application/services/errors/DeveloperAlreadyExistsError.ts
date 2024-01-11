import { ServiceError } from '@/core/errors/use-case-error'

export class DeveloperAlreadyExistsError extends Error implements ServiceError {
  constructor() {
    super(`Developer already exists`)
  }
}
