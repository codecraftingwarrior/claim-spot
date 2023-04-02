import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Pipe({
  name: 'canList'
})
export class CanListPipe implements PipeTransform {

  constructor(public authSrv: AuthService) {}

  transform(resourceName: string, ...args: string[]): boolean {
    return this.authSrv.hasListAuthority(resourceName);
  }

}
