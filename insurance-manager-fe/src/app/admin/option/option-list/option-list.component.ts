import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Option } from '../option';
import { optionColumns } from '../option.columns';
import { OptionService } from '../option.service';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss']
})
export class OptionListComponent implements OnInit {

  temp = [];
  options: Option[] = [];
  isNewModalVisible = false;
  isEditModalVisible = false;
  isViewModalVisible = false;
  selectedOption: Option;
  columns = optionColumns;
  @ViewChild('table') table: any;
  confirmModal?: NzModalRef;
  loadingIndicator = false;

  constructor(
    public location: Location,
    public authSrv: AuthService,
    public spinner: NgxSpinnerService,
    public optionSrv: OptionService,
    public activatedRoute: ActivatedRoute,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.options = this.activatedRoute.snapshot.data.options;
    if (this.options.length) {
      this.temp = [...this.options];
    }
  }


  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      const isFounded =
                                                        d.libelle.toLowerCase().indexOf(val) !== -1 ||
                                false
      return isFounded;
    });

    this.options = temp;
    if (this.table) {
      this.table.offset = 0;
    }
  }


  refresh() {
    this.spinner.show();
    this
      .optionSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => {this.spinner.hide(); this.loadingIndicator = false})
      ).subscribe((options: Option[]) => {
        this.options = options;
        this.options = [...this.options];
      }, err => {
        this.optionSrv.httpSrv.handleError(err);
      })
  }

  displayViewModal(option: Option) {
    this.selectedOption = option;
    this.isViewModalVisible = true;
  }

  displayEditModal(option: Option) {
    this.selectedOption = option;
    this.isEditModalVisible = true;
  }

  onCreated(option: Option) {
    this.options.push(option);
    this.options = [...this.options];
  }

  onUpdated(option: Option) {
    this.isEditModalVisible = false;
    this.refresh();
  }

  delete(option: Option) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous procéder à la suppression ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this
            .optionSrv
            .destroy(option)
            .subscribe((message: any) => {
              resolve(message);
            }, err => {
              reject(err);
            });
        })
          .then((message) => {
            this.options = this.options.filter(u => u.id !== option.id);
            this.options = [...this.options];
            this.optionSrv.httpSrv.notificationService.displaySuccess('Suppression reussi.')
          })
          .catch((err) => {
            this.optionSrv.httpSrv.handleError(err);
          })
    });
  }

}
