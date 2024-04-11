import { Exclude } from 'class-transformer';

export class SerializedUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
