import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UploadcareService {
  private baseUrl: string = 'https://upload.uploadcare.com/base/';
  private PUB_KEY = '305870a947844f2c4cf5';

  constructor(
    public http: HttpClient,
    public toastr: ToastrService
  ) { }

  upload(data: FormData): Observable<any> {
    data.append('UPLOADCARE_STORE', 'auto');
    data.append('UPLOADCARE_PUB_KEY', this.PUB_KEY);
    return this.http.post<string>(this.baseUrl, data);
  }

  completeUpload(files: FileList, onError: () => void = () => {}): Promise<{ file: string }> {
    const ext = files.item(0).name.split('.')[1];

    if (!['png', 'jpeg', 'jpg'].includes(ext.toLocaleLowerCase())) {
      this.toastr.error('Ce type de fichier n\'est pas pris en compte veuillez choisir une image');
      onError();
      return;
    }

    const data = new FormData();
    const newFilename = this.makeID(16) + '.' + ext;
    const image = new File([files.item(0)], `${newFilename}`, { type: files.item(0).type });

    data.append(`file`, image);

    return this.upload(data).toPromise();
  }

  makeID(length: number): string {
    let result: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
