import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { Option } from '../option';
import { OptionService } from '../option.service';

@Component({
  selector: 'app-option-new',
  templateUrl: './option-new.component.html',
  styleUrls: ['./option-new.component.scss']
})
export class OptionNewComponent implements OnInit {

option: Option;
  @Output() created: EventEmitter<Option> = new EventEmitter();
  constructor(
    public optionSrv: OptionService,
    private spinner: NgxSpinnerService,
  ) {
    this.option = new Option();
  }

  ngOnInit(): void {

  }

  create() {
    this.spinner.show();
    this
      .optionSrv
      .store(this.option)
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      )
      .subscribe((option: Option) => {
        this.created.emit(option);
        this.optionSrv.httpSrv.notificationService.displaySuccess('Opération réussi');
        this.option = new Option();
      }, err => {
        this.optionSrv.httpSrv.handleError(err);
      })
  }
}
