import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Mascotas, MascotasRelations, Raza, HistoriaMedica, Ciudad, SolicitudAdopcion, Vacuna, VacunaMascota} from '../models';
import {RazaRepository} from './raza.repository';
import {HistoriaMedicaRepository} from './historia-medica.repository';
import {CiudadRepository} from './ciudad.repository';
import {SolicitudAdopcionRepository} from './solicitud-adopcion.repository';
import {VacunaMascotaRepository} from './vacuna-mascota.repository';
import {VacunaRepository} from './vacuna.repository';

export class MascotasRepository extends DefaultCrudRepository<
  Mascotas,
  typeof Mascotas.prototype.id,
  MascotasRelations
> {

  public readonly raza: BelongsToAccessor<Raza, typeof Mascotas.prototype.id>;

  public readonly historiaMedicas: HasManyRepositoryFactory<HistoriaMedica, typeof Mascotas.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Mascotas.prototype.id>;

  public readonly solicitudAdopcions: HasManyRepositoryFactory<SolicitudAdopcion, typeof Mascotas.prototype.id>;

  public readonly vacunas: HasManyThroughRepositoryFactory<Vacuna, typeof Vacuna.prototype.id,
          VacunaMascota,
          typeof Mascotas.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('RazaRepository') protected razaRepositoryGetter: Getter<RazaRepository>, @repository.getter('HistoriaMedicaRepository') protected historiaMedicaRepositoryGetter: Getter<HistoriaMedicaRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('SolicitudAdopcionRepository') protected solicitudAdopcionRepositoryGetter: Getter<SolicitudAdopcionRepository>, @repository.getter('VacunaMascotaRepository') protected vacunaMascotaRepositoryGetter: Getter<VacunaMascotaRepository>, @repository.getter('VacunaRepository') protected vacunaRepositoryGetter: Getter<VacunaRepository>,
  ) {
    super(Mascotas, dataSource);
    this.vacunas = this.createHasManyThroughRepositoryFactoryFor('vacunas', vacunaRepositoryGetter, vacunaMascotaRepositoryGetter,);
    this.registerInclusionResolver('vacunas', this.vacunas.inclusionResolver);
    this.solicitudAdopcions = this.createHasManyRepositoryFactoryFor('solicitudAdopcions', solicitudAdopcionRepositoryGetter,);
    this.registerInclusionResolver('solicitudAdopcions', this.solicitudAdopcions.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.historiaMedicas = this.createHasManyRepositoryFactoryFor('historiaMedicas', historiaMedicaRepositoryGetter,);
    this.registerInclusionResolver('historiaMedicas', this.historiaMedicas.inclusionResolver);
    this.raza = this.createBelongsToAccessorFor('raza', razaRepositoryGetter,);
    this.registerInclusionResolver('raza', this.raza.inclusionResolver);
  }
}
