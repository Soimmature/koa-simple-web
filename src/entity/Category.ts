import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  TreeChildren,
  TreeParent,
  TreeLevelColumn,
  Tree,
  OneToMany,
  ManyToOne,
} from 'typeorm'

@Entity()
@Tree('closure-table')
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @TreeChildren()
  children: Category[]

  @TreeParent()
  parent: Category
}
