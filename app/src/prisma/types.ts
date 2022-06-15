import { Prisma } from '@prisma/client';

const userWithProfile = Prisma.validator<Prisma.UserArgs>()({
  include: {
    profile: true,
  },
});
export type UserWithProfile = Prisma.UserGetPayload<typeof userWithProfile>;
