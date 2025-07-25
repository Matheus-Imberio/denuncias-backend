import { Abstract, Provider, Type } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';


export function provideUseCase<T = unknown, U = unknown>(
  useCase: Type<T>,
  ...repositories: (Type<U> | Abstract<U>)[]
): Provider {
  return {
    provide: useCase,
    useFactory: (...args: unknown[]) => new useCase(...args),
    inject: repositories,
  };
}

export function injectPrisma<R>(
  abstractRepo: Abstract<R>,
  prismaRepo: Type<R>,
): Provider {
  return {
    provide: abstractRepo,
    useFactory: (prismaService: PrismaService) => {
      return new prismaRepo(prismaService);
    },
    inject: [PrismaService],
  };
}
