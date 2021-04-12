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
  Ciudad,
} from '../models';
import {MascotasRepository} from '../repositories';

export class MascotasCiudadController {
  constructor(
    @repository(MascotasRepository)
    public mascotasRepository: MascotasRepository,
  ) { }

  @get('/mascotas/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Ciudad belonging to Mascotas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudad)},
          },
        },
      },
    },
  })
  async getCiudad(
    @param.path.string('id') id: typeof Mascotas.prototype.id,
  ): Promise<Ciudad> {
    return this.mascotasRepository.ciudad(id);
  }
}
