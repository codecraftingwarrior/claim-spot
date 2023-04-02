import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BaseModel } from '../general/base.model';
import { HttpService } from './http.service';

export abstract class BaseService<T extends BaseModel> {

  public path: string;
  public resourceName: string;

  constructor(
    protected httpSrv: HttpService<T>,
    protected toastr: ToastrService,
  ) { }

  findAll(): Observable<T[]> {
    return this.httpSrv.get<T[]>(this.path);
  }

  find(id: number): Observable<T> {
    return this.httpSrv.get<T>(this.path + id);
  }

  store(entity: BaseModel): Observable<T> {
    return this.httpSrv.post<T>(this.path, entity);
  }

  update(entity: BaseModel): Observable<T> {
    return this.httpSrv.put<T>(this.path + entity.id, entity);
  }

  destroy(entity: BaseModel): Observable<{ deleted: boolean }> {
    return this.httpSrv.delete<{ deleted: boolean }>(this.path + entity.id);
  }

  /*removeMultiple(items: BaseModel[]) {
    return this.httpSrv.removeMultiple(this.path + 'remove-selection', items);
  }*/

  public getRoutePrefix(): string {
    return this.path;
  }
}
