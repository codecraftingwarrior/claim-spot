import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { finalize, first } from 'rxjs/operators';
import { Formule } from 'src/app/admin/formule/formule.model';
import { FormuleService } from 'src/app/admin/formule/formule.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formules: Formule[] = [];
  loading = false;
  constructor(
    public formuleSrv: FormuleService,
  ) { }

  ngOnInit(): void {
    this.findFormules();
  }

  findFormules() {
    this.loading = true;
    this
      .formuleSrv
      .findAll()
      .pipe(first(), finalize(() => this.loading = false))
      .subscribe((formules: Formule[]) => {
        this.formules = formules;
      }, err => {
        this.formuleSrv.httpSrv.handleError(err);
      });
  }

}
