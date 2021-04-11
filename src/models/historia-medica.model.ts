import {Entity, model, property} from '@loopback/repository';

@model()
export class HistoriaMedica extends Entity {
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
  especialidad: string;

  @property({
    type: 'string',
    required: true,
  })
  diagnostico: string;

  @property({
    type: 'string',
    required: true,
  })
  recomendaciones: string;


  constructor(data?: Partial<HistoriaMedica>) {
    super(data);
  }
}

export interface HistoriaMedicaRelations {
  // describe navigational properties here
}

export type HistoriaMedicaWithRelations = HistoriaMedica & HistoriaMedicaRelations;
