import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  ObjectType,
  Field,
} from 'type-graphql';
import { JobIt, JobItModel } from '../entities/JobIt';
import { User, UserModel } from '../entities/User';
import { AppContext } from '../types';

@Resolver()
export class JobRequestIt {
  @Mutation(() => JobIt, { nullable: true })
  async getjob(
    @Arg('typeJob') typeJob: string,
    @Arg('comment') comment: string,
    @Arg('desiredDate') desiredDate: string,
    // @Arg('usernameId') usernameId: string,
    @Ctx() { req, res }: AppContext
  ): Promise<JobIt | User | null> {
    try {
      if (!typeJob) throw new Error('Type job is required.');
      if (!comment) throw new Error('comment is required.');
      if (!desiredDate) throw new Error('Date is required.');

      const user = await UserModel.findById(req.userId);
      if (!user) return null;

      const newJob = await JobItModel.create<
        Pick<
          JobIt,
          'typeJob' | 'comment' | 'desiredDate' | 'usernameId' | 'username'
        >
      >({
        typeJob,
        comment,
        desiredDate,
        usernameId: user.id,
        username: user.username,
      });

      await newJob.save();

      return newJob;
    } catch (error) {
      throw error;
    }
  }
}
