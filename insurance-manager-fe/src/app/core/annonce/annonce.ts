import { BaseModel } from 'src/app/shared/general/base.model';
import { Vehicule } from '../vehicule/vehicule';

export class Annonce extends BaseModel {
    libelle: string;
    prix: number;
    type: string;
    validated: boolean;
    disabled: boolean;
    createdAt: any;
    vehicule: Vehicule;
}
