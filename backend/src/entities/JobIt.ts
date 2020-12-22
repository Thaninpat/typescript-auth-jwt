import { getModelForClass, prop } from '@typegoose/typegoose';

import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';

@ObjectType({ description: 'Job IT Model' })
export class JobIt {
  @Field(() => ID)
  id: string;

  @Field()
  @prop({ required: true })
  typeJob: string;

  @Field()
  @prop({ required: true })
  comment: string;

  @Field()
  @prop({ required: true })
  desiredDate: string;

  @Field()
  @prop({ default: () => Date.now() + 60 * 60 * 1000 * 7 })
  createdAt: Date;

  @Field()
  @prop({ required: true, ref: User })
  usernameId: string;

  @Field()
  @prop({ required: true, trim: true })
  username: string;
}

export const JobItModel = getModelForClass(JobIt);
