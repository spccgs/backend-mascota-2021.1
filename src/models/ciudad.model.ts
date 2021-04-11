import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Departamento} from './departamento.model';

@model({
  setting: {
    foreignKeys: {
      fk_depto_id: {
        name: 'fk_depto_ciudad_id',
        entity: 'departamento',
        entityKey: 'id',
        foreignKey: 'departamentoId',
      },
    },
  },
})
export class Ciudad extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @belongsTo(() => Departamento)
  departamentoId: number;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
