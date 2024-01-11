import { Entity } from '@/core/entities/entity'

export interface InstructionProps {
  name: string
  description: string
  createdAt: Date | null
  updatedAt: Date | null
}

export class Instruction extends Entity<InstructionProps> {
  private constructor(props: InstructionProps) {
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

  public static create(props: InstructionProps): Instruction {
    return new Instruction(props)
  }
}
