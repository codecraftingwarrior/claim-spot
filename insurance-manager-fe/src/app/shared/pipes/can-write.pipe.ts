import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'canWrite'
})
export class CanWritePipe implements PipeTransform {

  constructor(public authSrv: AuthService) {}

  transform(resourceName: string, ...args: string[]): boolean {
    return this.authSrv.hasAuthority(`${resourceName}:write`);
  }
}
