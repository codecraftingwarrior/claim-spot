import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { Option } from '../option';
import { OptionService } from '../option.service';

@Component({
  selector: 'app-option-edit',
  templateUrl: './option-edit.component.html',
  styleUrls: ['./option-edit.component.scss']
})
export class OptionEditComponent implements OnInit {

  @Input() option: Option;
  @Output() updated: EventEmitter<any> = new EventEmitter();
  constructor(
    public optionSrv: OptionService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  update() {
    this.spinner.show();
    this
      .optionSrv
      .update(this.option)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((option: Option) => {
        this.updated.emit();
        this.optionSrv.httpSrv.notificationService.displaySuccess('Opération réussi.');
      }, err => {
        this.optionSrv.httpSrv.handleError(err);
      });
  }

}
