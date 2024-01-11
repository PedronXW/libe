import { Entity } from '@/core/entities/entity'

export interface ProjectProps {
  name: string
  description: string
  createdAt: Date | null
  updatedAt: Date | null
}

export class Project extends Entity<ProjectProps> {
  private constructor(props: ProjectProps) {
    super(props)
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get createdAt(): Date | null {
    return this.props.createdAt
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt
  }

  public static create(props: ProjectProps): Project {
    return new Project(props)
  }
}
