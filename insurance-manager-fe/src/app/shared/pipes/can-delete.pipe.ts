import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'canDelete'
})
export class CanDeletePipe implements PipeTransform {

  constructor(public authSrv: AuthService) {}

  transform(resourceName: string, ...args: string[]): boolean {
    return this.authSrv.hasAuthority(`${resourceName}:delete`);
  }

}
