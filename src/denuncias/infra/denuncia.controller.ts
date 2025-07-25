import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { matchHttps } from 'src/@core/response.core';
import { DocumentMethod } from 'src/shared/lib/swagger/DocumentMethod';
import { DenunciaDTO, PartialDenunciaDTO } from '../@types/denuncia.dto';
import { CreateDenunciaUseCase } from '../usecases/createDenuncia.usecase';
import { DeleteDenunciaUseCase } from '../usecases/deleteDenuncia.usecase';
import { GetDenunciaByIdUseCase } from '../usecases/getDenunciaById.usecase';
import { GetDenunciasUseCase } from '../usecases/getDenuncias.usecase';
import { UpdateDenunciaUseCase } from '../usecases/updateDenuncia.usecase';
import {
  CreateDenunciaDocumentationObject,
  DeleteDenunciaDocumentationObject,
  GetDenunciaByIdDocumentationObject,
  GetDenunciasDocumentationObject,
  UpdateDenunciaDocumentationObject,
} from './denuncia.docs';

@Controller('denuncias')
export class DenunciaController {
  constructor(
    private readonly createDenunciaUseCase: CreateDenunciaUseCase,
    private readonly getDenunciaByIdUseCase: GetDenunciaByIdUseCase,
    private readonly getDenunciasUseCase: GetDenunciasUseCase,
    private readonly updateDenunciaUseCase: UpdateDenunciaUseCase,
    private readonly deleteDenunciaUseCase: DeleteDenunciaUseCase,
  ) {}

  @DocumentMethod(CreateDenunciaDocumentationObject)
  @Post()
  async create(@Body() dto: DenunciaDTO) {
    return matchHttps(
      await this.createDenunciaUseCase.execute(dto),
      HttpStatus.CREATED,
    );
  }

  @DocumentMethod(GetDenunciasDocumentationObject)
  @Get()
  async findAll() {
    return matchHttps(await this.getDenunciasUseCase.execute(), HttpStatus.OK);
  }

  @DocumentMethod(GetDenunciaByIdDocumentationObject)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return matchHttps(
      await this.getDenunciaByIdUseCase.execute(id),
      HttpStatus.OK,
    );
  }

  @DocumentMethod(UpdateDenunciaDocumentationObject)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: PartialDenunciaDTO) {
    return matchHttps(
      await this.updateDenunciaUseCase.execute({ id, data: dto }),
      HttpStatus.OK,
    );
  }
  @DocumentMethod(DeleteDenunciaDocumentationObject)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return matchHttps(
      await this.deleteDenunciaUseCase.execute(id),
      HttpStatus.NO_CONTENT,
    );
  }
}
