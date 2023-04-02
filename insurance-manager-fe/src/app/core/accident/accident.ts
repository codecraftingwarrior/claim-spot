import { Etat } from 'src/app/admin/etat/etat';
import { ApplicationUser } from 'src/app/admin/user/application-user';
import { BaseModel } from 'src/app/shared/general/base.model';
import { DetailAdversaire } from '../detail-adversaire/detail-adversaire';
import { Photo } from '../photo/photo';
import { RendezVous } from '../rendez-vous/rendez-vou';
import { Vehicule } from '../vehicule/vehicule';

export class Accident extends BaseModel {
    code: string;
    date: Date;
    heure: string;
    lieu: string;
    details: string;
    changed: boolean;
    createdAt: Date;
    montantRemboursement: number;
    motantReparartion: number;
    applicationUser: ApplicationUser;
    vehicule: Vehicule;
    etat: Etat;
    detailAdversaire: DetailAdversaire;
    rendezVous: RendezVous;
    photos: Photo[];
}
