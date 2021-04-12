import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {TipoMascota} from './tipo-mascota.model';
import {Mascotas} from './mascotas.model';

@model({
  setting: {
    foreignKeys: {
      fk_tipo_mascota_id: {
        name: 'fk_tipo_mascota_id',
        entity: 'TipoMascota',
        entityKey: 'id',
        foreignKey: 'tipoMascotaId',
      },
    },
  },
})
export class Raza extends Entity {
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

  @belongsTo(() => TipoMascota)
  tipoMascotaId: number;

  @hasMany(() => Mascotas)
  mascotas: Mascotas[];

  constructor(data?: Partial<Raza>) {
    super(data);
  }
}

export interface RazaRelations {
  // describe navigational properties here
}

export type RazaWithRelations = Raza & RazaRelations;
