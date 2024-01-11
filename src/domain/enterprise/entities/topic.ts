import { Entity } from '@/core/entities/entity'

export interface TopicProps {
  name: string
  description: string
  createdAt: Date | null
  updatedAt: Date | null
}

export class Topic extends Entity<TopicProps> {
  constructor(props: TopicProps) {
    super(props)
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props) {
    return new Topic(props)
  }
}
