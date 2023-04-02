import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'hasAnyResourceAuthority'
})
export class HasAnyResourceAuthorityPipe implements PipeTransform {

  constructor(public authSrv: AuthService) {}

  transform(value: any, ...args: any[]): boolean {
    return this.authSrv.hasAnyResourceAuthority(value);
  }


}
