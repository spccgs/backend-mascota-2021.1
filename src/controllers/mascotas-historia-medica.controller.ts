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
  HistoriaMedica,
} from '../models';
import {MascotasRepository} from '../repositories';

export class MascotasHistoriaMedicaController {
  constructor(
    @repository(MascotasRepository) protected mascotasRepository: MascotasRepository,
  ) { }

  @get('/mascotas/{id}/historia-medicas', {
    responses: {
      '200': {
        description: 'Array of Mascotas has many HistoriaMedica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(HistoriaMedica)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<HistoriaMedica>,
  ): Promise<HistoriaMedica[]> {
    return this.mascotasRepository.historiaMedicas(id).find(filter);
  }

  @post('/mascotas/{id}/historia-medicas', {
    responses: {
      '200': {
        description: 'Mascotas model instance',
        content: {'application/json': {schema: getModelSchemaRef(HistoriaMedica)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascotas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaMedica, {
            title: 'NewHistoriaMedicaInMascotas',
            exclude: ['id'],
            optional: ['mascotasId']
          }),
        },
      },
    }) historiaMedica: Omit<HistoriaMedica, 'id'>,
  ): Promise<HistoriaMedica> {
    return this.mascotasRepository.historiaMedicas(id).create(historiaMedica);
  }

  @patch('/mascotas/{id}/historia-medicas', {
    responses: {
      '200': {
        description: 'Mascotas.HistoriaMedica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HistoriaMedica, {partial: true}),
        },
      },
    })
    historiaMedica: Partial<HistoriaMedica>,
    @param.query.object('where', getWhereSchemaFor(HistoriaMedica)) where?: Where<HistoriaMedica>,
  ): Promise<Count> {
    return this.mascotasRepository.historiaMedicas(id).patch(historiaMedica, where);
  }

  @del('/mascotas/{id}/historia-medicas', {
    responses: {
      '200': {
        description: 'Mascotas.HistoriaMedica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(HistoriaMedica)) where?: Where<HistoriaMedica>,
  ): Promise<Count> {
    return this.mascotasRepository.historiaMedicas(id).delete(where);
  }
}
