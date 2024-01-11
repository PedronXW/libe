import { Developer } from '@/domain/enterprise/entities/developer'

export class DeveloperPresenter {
  static toHTTP(developer: Developer) {
    return {
      id: developer.id.getValue(),
      name: developer.name,
      email: developer.email,
      createdAt: developer.createdAt,
      updatedAt: developer.updatedAt,
    }
  }
}
