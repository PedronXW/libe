import { EntityId } from '@/core/entities/entity-id'
import { Developer } from '@/domain/enterprise/entities/developer'

export class DeveloperMapper {
  static toDomain(raw): Developer {
    return Developer.create(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new EntityId(raw.id),
    )
  }

  static toPersistence(developer: Developer) {
    return {
      id: developer.id.getValue(),
      name: developer.name,
      email: developer.email,
      password: developer.password,
      createdAt: developer.createdAt,
      updatedAt: developer.updatedAt,
    }
  }
}
