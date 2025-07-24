import { PrismaService } from 'prisma/prisma.service';
import { HttpError } from 'src/@core/error.core';
import { fail, ResultAsync, success } from 'src/@core/result.core';
import { Endereco } from '../domain/endereco.entity';
import { EnderecoMapper } from '../mappers/endereco.mapper';
import { EnderecoRepository } from './endereco.repository';

export class PrismaEnderecoRepository implements EnderecoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(endereco: Endereco) {
    const data = EnderecoMapper.toPersist(endereco);

    return ResultAsync.fromPromiseHttp(
      this.prismaService.endereco.create({ data }),
    ).map((created) => EnderecoMapper.toDomain(created));
  }

  update(endereco: Endereco) {
    const data = EnderecoMapper.toPersist(endereco);

    return ResultAsync.fromPromiseHttp(
      this.prismaService.endereco.update({
        where: { id: endereco.id },
        data,
      }),
    ).map((updated) => EnderecoMapper.toDomain(updated));
  }

  findAll() {
    return ResultAsync.fromPromiseHttp(
      this.prismaService.endereco.findMany(),
    ).map((enderecos) =>
      enderecos.map((endereco) => EnderecoMapper.toDomain(endereco)),
    );
  }

  findOne(id: string) {
    return ResultAsync.fromPromiseHttp(
      this.prismaService.endereco.findUnique({ where: { id } }),
    ).andThen((endereco) => {
      if (!endereco) {
        return fail(new HttpError('Endereco not found', 404));
      }

      return success(EnderecoMapper.toDomain(endereco));
    });
  }

  remove(id: string) {
    return ResultAsync.fromPromiseHttp(
      this.prismaService.endereco.delete({
        where: { id: id },
      }),
    ).map(() => null);
  }
}
