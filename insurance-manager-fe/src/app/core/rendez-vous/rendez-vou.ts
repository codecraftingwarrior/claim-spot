import { Creneau } from 'src/app/admin/creneau/creneau';
import { BaseModel } from 'src/app/shared/general/base.model';
import { Accident } from '../accident/accident';

export class RendezVous extends BaseModel {
    description: string;
    creneau: Creneau;
    accident: Accident;
}
