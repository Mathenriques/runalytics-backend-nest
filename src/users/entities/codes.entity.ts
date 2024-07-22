import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('codes')
export class Code {
  @PrimaryColumn()
  id: string;

  @Column()
  code: string

  constructor(
    props: {
      code: string;
    }
  ) {
    Object.assign(this, props);
  }
}