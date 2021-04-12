import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Raza} from './raza.model';
import {HistoriaMedica} from './historia-medica.model';
import {Ciudad} from './ciudad.model';
import {SolicitudAdopcion} from './solicitud-adopcion.model';
import {Vacuna} from './vacuna.model';
import {VacunaMascota} from './vacuna-mascota.model';

@model({
  setting: {
    foreignKeys: {
      fk_raza_id_mascotas: {
        name: 'fk_raza_id_mascotas',
        entity: 'Raza',
        entityKey: 'id',
        foreignKey: 'razaId',
      },
      fk_ciudad_id_mascotas: {
        name: 'fk_ciudad_id_mascotas',
        entity: 'Ciudad',
        entityKey: 'id',
        foreignKey: 'ciudadId',
      },
    },
  },
})
export class Mascotas extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  identificador: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion?: string;

  @property({
    type: 'string',
    required: false,
  })
  imagen?: string;

  @belongsTo(() => Raza)
  razaId: number;

  @hasMany(() => HistoriaMedica)
  historiaMedicas: HistoriaMedica[];

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasMany(() => SolicitudAdopcion)
  solicitudAdopcions: SolicitudAdopcion[];

  @hasMany(() => Vacuna, {through: {model: () => VacunaMascota}})
  vacunas: Vacuna[];

  constructor(data?: Partial<Mascotas>) {
    super(data);
  }
}

export interface MascotasRelations {
  // describe navigational properties here
}

export type MascotasWithRelations = Mascotas & MascotasRelations;
