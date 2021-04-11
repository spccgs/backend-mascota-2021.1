import {Entity, model, property} from '@loopback/repository';

@model()
export class Macota extends Entity {
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

  constructor(data?: Partial<Macota>) {
    super(data);
  }
}

export interface MacotaRelations {
  // describe navigational properties here
}

export type MacotaWithRelations = Macota & MacotaRelations;
