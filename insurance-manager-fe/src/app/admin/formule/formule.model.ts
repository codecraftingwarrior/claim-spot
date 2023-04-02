import { BaseModel } from 'src/app/shared/general/base.model';
import { Option } from '../option/option';

export class Formule extends BaseModel {
    code: string;
    libelle: string;
    montant: string;
    description: string;
    canPost: string;
    visible: boolean;
    options: Option[];

}
