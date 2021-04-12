import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Raza, RazaRelations, TipoMascota, Mascotas} from '../models';
import {TipoMascotaRepository} from './tipo-mascota.repository';
import {MascotasRepository} from './mascotas.repository';

export class RazaRepository extends DefaultCrudRepository<
  Raza,
  typeof Raza.prototype.id,
  RazaRelations
> {

  public readonly tipoMascota: BelongsToAccessor<TipoMascota, typeof Raza.prototype.id>;

  public readonly mascotas: HasManyRepositoryFactory<Mascotas, typeof Raza.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('TipoMascotaRepository') protected tipoMascotaRepositoryGetter: Getter<TipoMascotaRepository>, @repository.getter('MascotasRepository') protected mascotasRepositoryGetter: Getter<MascotasRepository>,
  ) {
    super(Raza, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotasRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.tipoMascota = this.createBelongsToAccessorFor('tipoMascota', tipoMascotaRepositoryGetter,);
    this.registerInclusionResolver('tipoMascota', this.tipoMascota.inclusionResolver);
  }
}
