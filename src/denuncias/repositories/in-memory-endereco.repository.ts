import { HttpError } from 'src/@core/error.core';
import { failAsync, successAsync } from 'src/@core/result.core';
import { DEFAULT_ID } from 'src/shared/utils/test';
import { Endereco } from '../domain/endereco.entity';
import { EnderecoRepository } from './endereco.repository';

export class InMemoryEnderecoRepository implements EnderecoRepository {
  private enderecos: Endereco[] = [];

  create(endereco: Endereco) {
    const newEndereco = new Endereco(endereco.props, endereco.id ?? DEFAULT_ID);
    this.enderecos.push(newEndereco);
    return successAsync(newEndereco);
  }

  findAll() {
    return successAsync(this.enderecos);
  }
  findOne(id: string) {
    const endereco = this.enderecos.find((e) => e.id === id);
    if (!endereco) {
      return failAsync(new HttpError('Endereco not found', 404));
    }
    return successAsync(endereco);
  }
  update(endereco: Endereco) {
    const index = this.enderecos.findIndex((e) => e.id === endereco.id);
    if (index === -1) {
      return failAsync(new HttpError('Endereco not found', 404));
    }
    this.enderecos.splice(index, 1, endereco);
    return successAsync(endereco);
  }

  remove(id: string) {
    const endereco = this.enderecos.find((e) => e.id === id);
    if (!endereco) {
      return failAsync(new HttpError('Endereco not found', 404));
    }
    this.enderecos = this.enderecos.filter((e) => e.id !== id);
    return successAsync(null);
  }
}
