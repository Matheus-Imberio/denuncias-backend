import { HttpError } from 'src/@core/error.core';
import { failAsync, successAsync } from 'src/@core/result.core';
import { DEFAULT_ID } from 'src/shared/utils/test';
import { Denuncia } from '../domain/denuncia.entity';
import { DenunciaRepository } from './denuncia.repository';

export class InMemoryDenunciaRepository implements DenunciaRepository {
  private denuncias: Denuncia[] = [];

  create(denuncia: Denuncia) {
    const newDenuncia = new Denuncia(denuncia.props, denuncia.id ?? DEFAULT_ID);
    this.denuncias.push(newDenuncia);
    return successAsync(newDenuncia);
  }

  findAll() {
    return successAsync(this.denuncias);
  }

  findOne(id: string) {
    const denuncia = this.denuncias.find((d) => d.id === id);
    if (!denuncia) {
      return failAsync(new HttpError('Denuncia not found', 404));
    }
    return successAsync(denuncia);
  }

  update(denuncia: Denuncia) {
    const index = this.denuncias.findIndex((d) => d.id === denuncia.id);
    if (index === -1) {
      return failAsync(new HttpError('Denuncia not found', 404));
    }
    this.denuncias.splice(index, 1, denuncia);
    return successAsync(denuncia);
  }

  remove(id: string) {
    const denuncia = this.denuncias.find((d) => d.id === id);
    if (!denuncia) {
      return failAsync(new HttpError('Denuncia not found', 404));
    }
    this.denuncias = this.denuncias.filter((d) => d.id !== id);
    return successAsync(null);
  }
}
