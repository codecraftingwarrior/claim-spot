import { BaseModel } from 'src/app/shared/general/base.model';
import { Formule } from '../formule/formule.model';
import { Role } from '../role/role';

export class ApplicationUser extends BaseModel {
    username: string;
    password: string;
    plainPassword?: string;
    newPassword?: string;
    authorities: Array<any>;
    prenom: string;
    nom: string;
    telephone: string;
    adresse: string;
    fonction: string;
    genre: string;
    imageFilename: string;
    imageFilepath: string;
    imgProfile: string;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    enabled: boolean;
    grantedAuthorities: Array<any>;
    roles: Role[];
    formule: Formule;
}