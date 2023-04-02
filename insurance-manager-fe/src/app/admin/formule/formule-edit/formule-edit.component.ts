import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { Formule } from '../formule.model';
import { FormuleService } from '../formule.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { OptionService } from '../../option/option.service';
import { Option } from '../../option/option';

@Component({
  selector: 'app-formule-edit',
  templateUrl: './formule-edit.component.html',
  styleUrls: ['./formule-edit.component.scss']
})
export class FormuleEditComponent implements OnInit {

  editor = ClassicEditor;
  options: Option[] = [];
  selectedOptions: Option[] = [];
  @Input() formule: Formule;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  constructor(
    public formuleSrv: FormuleService,
    private spinner: NgxSpinnerService,
    private optionSrv: OptionService
  ) { }

  ngOnInit(): void {
    this.selectedOptions = this.formule.options;
    this.findOptions();
  }

  update() {
    const { formule } = this;
    this.spinner.show();
    this
      .formuleSrv
      .update({
        ...formule,
        ...{ options: this.selectedOptions.map(opt => ({ id: opt.id }) as any) }
      })
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((formule: Formule) => {
        this.updated.emit();
        this.formuleSrv.httpSrv.notificationService.displaySuccess('Opération réussi.');
      }, err => {
        this.formuleSrv.httpSrv.handleError(err);
      });
  }

  findOptions() {
    this.spinner.show();
    this
      .optionSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((options: Option[]) => {
        this.options = options;
        this.options = [...this.options];
      }, err => {
        this.optionSrv.httpSrv.handleError(err);
      });
  }

}
