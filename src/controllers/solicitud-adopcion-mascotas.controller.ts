import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudAdopcion,
  Mascotas,
} from '../models';
import {SolicitudAdopcionRepository} from '../repositories';

export class SolicitudAdopcionMascotasController {
  constructor(
    @repository(SolicitudAdopcionRepository)
    public solicitudAdopcionRepository: SolicitudAdopcionRepository,
  ) { }

  @get('/solicitud-adopcions/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Mascotas belonging to SolicitudAdopcion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascotas)},
          },
        },
      },
    },
  })
  async getMascotas(
    @param.path.number('id') id: typeof SolicitudAdopcion.prototype.id,
  ): Promise<Mascotas> {
    return this.solicitudAdopcionRepository.mascotas(id);
  }
}
