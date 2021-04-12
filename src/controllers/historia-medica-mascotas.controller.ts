import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  HistoriaMedica,
  Mascotas,
} from '../models';
import {HistoriaMedicaRepository} from '../repositories';

export class HistoriaMedicaMascotasController {
  constructor(
    @repository(HistoriaMedicaRepository)
    public historiaMedicaRepository: HistoriaMedicaRepository,
  ) { }

  @get('/historia-medicas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Mascotas belonging to HistoriaMedica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascotas)},
          },
        },
      },
    },
  })
  async getMascotas(
    @param.path.number('id') id: typeof HistoriaMedica.prototype.id,
  ): Promise<Mascotas> {
    return this.historiaMedicaRepository.mascotas(id);
  }
}
