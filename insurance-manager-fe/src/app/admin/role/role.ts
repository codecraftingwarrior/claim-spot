import { BaseModel } from 'src/app/shared/general/base.model';

export class Role extends BaseModel {
    code: string;
    nom: string;
    permissions: Array<any>;
}