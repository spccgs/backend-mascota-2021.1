import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Mascotas} from './mascotas.model';
import {Persona} from './persona.model';
import {EstadoSolicitud} from './estado-solicitud.model';

@model({
  setting: {
    foreignKeys: {
      fk_mascotas_id_solicitud: {
        name: 'fk_mascotas_id_solicitud',
        entity: 'Mascotas',
        entityKey: 'id',
        foreignKey: 'mascotasId',
      },
      fk_persona_id_solicitud: {
        name: 'fk_persona_id_solicitud',
        entity: 'Persona',
        entityKey: 'id',
        foreignKey: 'personaId',
      },
      fk_estado_id_solicitud: {
        name: 'fk_estado_id_solicitud',
        entity: 'EstadoSolicitud',
        entityKey: 'id',
        foreignKey: 'estadoSolicitudId',
      },
    },
  },
})
export class SolicitudAdopcion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Mascotas)
  mascotasId: string;

  @belongsTo(() => Persona)
  personaId: number;

  @belongsTo(() => EstadoSolicitud)
  estadoSolicitudId: number;

  constructor(data?: Partial<SolicitudAdopcion>) {
    super(data);
  }
}

export interface SolicitudAdopcionRelations {
  // describe navigational properties here
}

export type SolicitudAdopcionWithRelations = SolicitudAdopcion & SolicitudAdopcionRelations;
