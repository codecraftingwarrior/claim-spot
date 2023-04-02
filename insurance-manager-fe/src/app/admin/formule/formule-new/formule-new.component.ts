import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { Option } from '../../option/option';
import { OptionService } from '../../option/option.service';
import { Formule } from '../formule.model';
import { FormuleService } from '../formule.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-formule-new',
  templateUrl: './formule-new.component.html',
  styleUrls: ['./formule-new.component.scss']
})
export class FormuleNewComponent implements OnInit {

  editor = ClassicEditor;
  options: Option[] = [];
  selectedOptions: Option[] = [];
  formule: Formule;
  @Output() created: EventEmitter<Formule> = new EventEmitter();
  constructor(
    public formuleSrv: FormuleService,
    private spinner: NgxSpinnerService,
    private optionSrv: OptionService,
  ) {
    this.formule = new Formule();
    this.formule.description = '';
  }

  ngOnInit(): void {
    this.findOptions();
  }

  create() {
    this.formule.options = this.selectedOptions.map(option => ({ id: option.id })) as any;
    this.spinner.show();
    this
      .formuleSrv
      .store(this.formule)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe((formule: Formule) => {
        this.created.emit(formule);
        this.formuleSrv.httpSrv.notificationService.displaySuccess('Opération réussi');
        this.formule = new Formule();
        this.selectedOptions = [];
      }, err => {
        this.formuleSrv.httpSrv.handleError(err);
      })
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
