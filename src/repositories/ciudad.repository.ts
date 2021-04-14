import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Ciudad, CiudadRelations} from '../models';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {
  mascotas(id: number) {
    throw new Error('Method not implemented.');
  }
  departamento(id: number | undefined): import("../models").Departamento | PromiseLike<import("../models").Departamento> {
    throw new Error('Method not implemented.');
  }
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(Ciudad, dataSource);
  }
}
