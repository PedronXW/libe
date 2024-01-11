import { Entity } from '@/core/entities/entity'
import { EntityId } from '@/core/entities/entity-id'
import { Optional } from '@/core/types/optional'

export interface DeveloperProps {
  profile_picture?: string
  name: string
  email: string
  password: string
  createdAt: Date | null
  updatedAt?: Date | null
}

export class Developer extends Entity<DeveloperProps> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password(): string {
    return this.props.password
  }

  get createdAt(): Date | null {
    return this.props.createdAt
  }

  get updatedAt(): Date | null | undefined {
    return this.props.updatedAt
  }

  static create(
    props: Optional<DeveloperProps, 'createdAt'>,
    id?: EntityId,
  ): Developer {
    const developer = new Developer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )
    return developer
  }
}
