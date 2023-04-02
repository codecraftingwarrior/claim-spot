import { CategorieVehicule } from 'src/app/admin/categorie-vehicule/categorie-vehicule';
import { ApplicationUser } from 'src/app/admin/user/application-user';
import { BaseModel } from 'src/app/shared/general/base.model';
import { Annonce } from '../annonce/annonce';

export class Vehicule extends BaseModel {
    immatriculation: string;
    marque: string;
    modele: string;
    imgFilename: string;
    imgUrl: string;
    image: string;
    categorie: CategorieVehicule;
    applicationUser: ApplicationUser;
    annonce: Annonce;

}
