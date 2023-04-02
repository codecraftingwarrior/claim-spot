import { BaseModel } from 'src/app/shared/general/base.model';

export class Etat extends BaseModel {
    code: string;
    libelle: string;
    etatSuivant: Etat;

}
