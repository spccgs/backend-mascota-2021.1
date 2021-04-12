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
  Raza,
  Mascotas,
} from '../models';
import {RazaRepository} from '../repositories';

export class RazaMascotasController {
  constructor(
    @repository(RazaRepository) protected razaRepository: RazaRepository,
  ) { }

  @get('/razas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Array of Raza has many Mascotas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascotas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Mascotas>,
  ): Promise<Mascotas[]> {
    return this.razaRepository.mascotas(id).find(filter);
  }

  @post('/razas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Raza model instance',
        content: {'application/json': {schema: getModelSchemaRef(Mascotas)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Raza.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascotas, {
            title: 'NewMascotasInRaza',
            exclude: ['id'],
            optional: ['razaId']
          }),
        },
      },
    }) mascotas: Omit<Mascotas, 'id'>,
  ): Promise<Mascotas> {
    return this.razaRepository.mascotas(id).create(mascotas);
  }

  @patch('/razas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Raza.Mascotas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Mascotas, {partial: true}),
        },
      },
    })
    mascotas: Partial<Mascotas>,
    @param.query.object('where', getWhereSchemaFor(Mascotas)) where?: Where<Mascotas>,
  ): Promise<Count> {
    return this.razaRepository.mascotas(id).patch(mascotas, where);
  }

  @del('/razas/{id}/mascotas', {
    responses: {
      '200': {
        description: 'Raza.Mascotas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Mascotas)) where?: Where<Mascotas>,
  ): Promise<Count> {
    return this.razaRepository.mascotas(id).delete(where);
  }
}
