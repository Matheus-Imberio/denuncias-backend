import { PrismaService } from 'prisma/prisma.service';
import { HttpError } from 'src/@core/error.core';
import { fail, ResultAsync, success } from 'src/@core/result.core';
import { Denuncia } from '../domain/denuncia.entity';
import { DenunciaMapper } from '../mappers/denuncia.mapper';
import { DenunciaRepository } from './denuncia.repository';

export class PrismaDenunciaRepository implements DenunciaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(denuncia: Denuncia) {
    const data = DenunciaMapper.toPersist(denuncia);

    return ResultAsync.fromPromiseHttp(
      this.prismaService.denuncia.create({ data }),
    ).map((created) => DenunciaMapper.toDomain(created));
  }

  update(denuncia: Denuncia) {
    const data = DenunciaMapper.toPersist(denuncia);

    return ResultAsync.fromPromiseHttp(
      this.prismaService.denuncia.update({
        where: { id: denuncia.id },
        data,
      }),
    ).map((updated) => DenunciaMapper.toDomain(updated));
  }

  findAll() {
    return ResultAsync.fromPromiseHttp(
      this.prismaService.denuncia.findMany(),
    ).map((denuncias) =>
      denuncias.map((denuncia) => DenunciaMapper.toDomain(denuncia)),
    );
  }

  findOne(id: string) {
    return ResultAsync.fromPromiseHttp(
      this.prismaService.denuncia.findUnique({ where: { id } }),
    ).andThen((denuncia) => {
      if (!denuncia) {
        return fail(new HttpError('Denuncia not found', 404));
      }

      return success(DenunciaMapper.toDomain(denuncia));
    });
  }

  remove(id: string) {
    return ResultAsync.fromPromiseHttp(
      this.prismaService.denuncia.delete({
        where: { id: id },
      }),
    ).map(() => null);
  }
}
