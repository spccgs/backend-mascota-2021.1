import {Entity, model, property} from '@loopback/repository';

@model({
  setting: {
    foreignKeys: {
      fk_mascotas_id_vacuna: {
        name: 'fk_mascotas_id_vacuna',
        entity: 'Mascotas',
        entityKey: 'id',
        foreignKey: 'mascotasId',
      },
      fk_vacuna_id_vacuna: {
        name: 'fk_vacuna_id_vacuna',
        entity: 'Vacuna',
        entityKey: 'id',
        foreignKey: 'vacunaId',
      },
    },
  },
})
export class VacunaMascota extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  mascotasId?: string;

  @property({
    type: 'number',
  })
  vacunaId?: number;

  constructor(data?: Partial<VacunaMascota>) {
    super(data);
  }
}

export interface VacunaMascotaRelations {
  // describe navigational properties here
}

export type VacunaMascotaWithRelations = VacunaMascota & VacunaMascotaRelations;
