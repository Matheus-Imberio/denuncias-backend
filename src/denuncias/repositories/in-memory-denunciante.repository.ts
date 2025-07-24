import { HttpError } from 'src/@core/error.core';
import { failAsync, successAsync } from 'src/@core/result.core';
import { DEFAULT_ID } from 'src/shared/utils/test';
import { Denunciante } from '../domain/denunciante.entity';
import { DenuncianteRepository } from './denunciante.repository';

export class InMemoryDenuncianteRepository implements DenuncianteRepository {
  private denunciantes: Denunciante[] = [];

  create(denunciante: Denunciante) {
    const newDenunciante = new Denunciante(
      denunciante.props,
      denunciante.id ?? DEFAULT_ID,
    );
    this.denunciantes.push(newDenunciante);
    return successAsync(newDenunciante);
  }

  findAll() {
    return successAsync(this.denunciantes);
  }

  findOne(id: string) {
    const denunciante = this.denunciantes.find((d) => d.id === id);
    if (!denunciante) {
      return failAsync(new HttpError('Denunciante not found', 404));
    }
    return successAsync(denunciante);
  }

  update(denunciante: Denunciante) {
    const index = this.denunciantes.findIndex((d) => d.id === denunciante.id);
    if (index === -1) {
      return failAsync(new HttpError('Denunciante not found', 404));
    }
    this.denunciantes.splice(index, 1, denunciante);
    return successAsync(denunciante);
  }

  remove(id: string) {
    const denunciante = this.denunciantes.find((d) => d.id === id);
    if (!denunciante) {
      return failAsync(new HttpError('Denunciante not found', 404));
    }
    this.denunciantes = this.denunciantes.filter((d) => d.id !== id);
    return successAsync(null);
  }
}
