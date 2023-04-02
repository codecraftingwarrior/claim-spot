import { BaseModel } from 'src/app/shared/general/base.model';

export class Creneau extends BaseModel {
    date: string;
    heure: string;
    choosen: boolean;

}
