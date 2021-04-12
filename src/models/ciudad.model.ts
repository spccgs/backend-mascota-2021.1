import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Mascotas} from './mascotas.model';

@model({
  setting: {
    foreignKeys: {
      fk_depto_id: {
        name: 'fk_depto_id',
        entity: 'Departamento',
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

  @hasMany(() => Mascotas)
  mascotas: Mascotas[];

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
