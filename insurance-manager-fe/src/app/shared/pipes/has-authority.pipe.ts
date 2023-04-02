import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'hasAuthority'
})
export class HasAuthorityPipe implements PipeTransform {

  constructor(public authSrv: AuthService) { }

  transform(value: string, ...args: string[]): boolean {
    return this.authSrv.hasAuthority(value);
  }

}
