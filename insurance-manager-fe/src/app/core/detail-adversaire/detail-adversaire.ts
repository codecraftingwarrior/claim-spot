import { CategorieVehicule } from 'src/app/admin/categorie-vehicule/categorie-vehicule';
import { BaseModel } from 'src/app/shared/general/base.model';

export class DetailAdversaire extends BaseModel {
    prenom: string;
    nom: string;
    genre: string;
    marqueVehicule: string;
    modeleVehicule: string;
    immatriculation: string;
    description: string;
    categorieVehicule: CategorieVehicule;
}
