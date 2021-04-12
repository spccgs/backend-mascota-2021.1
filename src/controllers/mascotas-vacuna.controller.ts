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
VacunaMascota,
Vacuna,
} from '../models';
import {MascotasRepository} from '../repositories';

export class MascotasVacunaController {
  constructor(
    @repository(MascotasRepository) protected mascotasRepository: MascotasRepository,
  ) { }

  @get('/mascotas/{id}/vacunas', {
    responses: {
      '200': {
        description: 'Array of Mascotas has many Vacuna through VacunaMascota',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vacuna)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vacuna>,
  ): Promise<Vacuna[]> {
    return this.mascotasRepository.vacunas(id).find(filter);
  }

  @post('/mascotas/{id}/vacunas', {
    responses: {
      '200': {
        description: 'create a Vacuna model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vacuna)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mascotas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacuna, {
            title: 'NewVacunaInMascotas',
            exclude: ['id'],
          }),
        },
      },
    }) vacuna: Omit<Vacuna, 'id'>,
  ): Promise<Vacuna> {
    return this.mascotasRepository.vacunas(id).create(vacuna);
  }

  @patch('/mascotas/{id}/vacunas', {
    responses: {
      '200': {
        description: 'Mascotas.Vacuna PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vacuna, {partial: true}),
        },
      },
    })
    vacuna: Partial<Vacuna>,
    @param.query.object('where', getWhereSchemaFor(Vacuna)) where?: Where<Vacuna>,
  ): Promise<Count> {
    return this.mascotasRepository.vacunas(id).patch(vacuna, where);
  }

  @del('/mascotas/{id}/vacunas', {
    responses: {
      '200': {
        description: 'Mascotas.Vacuna DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vacuna)) where?: Where<Vacuna>,
  ): Promise<Count> {
    return this.mascotasRepository.vacunas(id).delete(where);
  }
}
