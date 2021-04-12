import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Mascotas,
  SolicitudAdopcion,
} from '../models';
import {MascotasRepository} from '../repositories';

export class MascotasSolicitudAdopcionController {
  constructor(
    @repository(MascotasRepository) protected mascotasRepository: MascotasRepository,
  ) { }

  @get('/mascotas/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'Array of Mascotas has many SolicitudAdopcion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudAdopcion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudAdopcion>,
  ): Promise<SolicitudAdopcion[]> {
    return this.mascotasRepository.solicitudAdopcions(id).find(filter);
  }

  @post('/mascotas/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'Mascotas model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudAdopcion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascotas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAdopcion, {
            title: 'NewSolicitudAdopcionInMascotas',
            exclude: ['id'],
            optional: ['mascotasId']
          }),
        },
      },
    }) solicitudAdopcion: Omit<SolicitudAdopcion, 'id'>,
  ): Promise<SolicitudAdopcion> {
    return this.mascotasRepository.solicitudAdopcions(id).create(solicitudAdopcion);
  }

  @patch('/mascotas/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'Mascotas.SolicitudAdopcion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudAdopcion, {partial: true}),
        },
      },
    })
    solicitudAdopcion: Partial<SolicitudAdopcion>,
    @param.query.object('where', getWhereSchemaFor(SolicitudAdopcion)) where?: Where<SolicitudAdopcion>,
  ): Promise<Count> {
    return this.mascotasRepository.solicitudAdopcions(id).patch(solicitudAdopcion, where);
  }

  @del('/mascotas/{id}/solicitud-adopcions', {
    responses: {
      '200': {
        description: 'Mascotas.SolicitudAdopcion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudAdopcion)) where?: Where<SolicitudAdopcion>,
  ): Promise<Count> {
    return this.mascotasRepository.solicitudAdopcions(id).delete(where);
  }
}
