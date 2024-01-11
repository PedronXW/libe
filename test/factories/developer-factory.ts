import { EntityId } from '@/core/entities/entity-id'
import { Developer } from '@/domain/enterprise/entities/developer'

export function makeDeveloper(override: Partial<Developer> = {}, id?: string) {
  return Developer.create(
    {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      ...override,
    },
    new EntityId(id),
  )
}
