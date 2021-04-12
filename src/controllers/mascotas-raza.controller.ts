import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mascotas,
  Raza,
} from '../models';
import {MascotasRepository} from '../repositories';

export class MascotasRazaController {
  constructor(
    @repository(MascotasRepository)
    public mascotasRepository: MascotasRepository,
  ) { }

  @get('/mascotas/{id}/raza', {
    responses: {
      '200': {
        description: 'Raza belonging to Mascotas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Raza)},
          },
        },
      },
    },
  })
  async getRaza(
    @param.path.string('id') id: typeof Mascotas.prototype.id,
  ): Promise<Raza> {
    return this.mascotasRepository.raza(id);
  }
}
