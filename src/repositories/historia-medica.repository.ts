import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {HistoriaMedica, HistoriaMedicaRelations, Mascotas} from '../models';
import {MascotasRepository} from './mascotas.repository';

export class HistoriaMedicaRepository extends DefaultCrudRepository<
  HistoriaMedica,
  typeof HistoriaMedica.prototype.id,
  HistoriaMedicaRelations
> {

  public readonly mascotas: BelongsToAccessor<Mascotas, typeof HistoriaMedica.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('MascotasRepository') protected mascotasRepositoryGetter: Getter<MascotasRepository>,
  ) {
    super(HistoriaMedica, dataSource);
    this.mascotas = this.createBelongsToAccessorFor('mascotas', mascotasRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
