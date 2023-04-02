import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ApplicationUser } from '../application-user';
import { userColumns } from '../columns';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  temp = [];
  users: ApplicationUser[] = [];
  isNewModalVisible = false;
  isEditModalVisible = false;
  isViewModalVisible = false;
  selectedUser: ApplicationUser;
  columns = userColumns;
  @ViewChild('table') table: any;
  confirmModal?: NzModalRef;

  constructor(
    public location: Location,
    public authSrv: AuthService,
    public spinner: NgxSpinnerService,
    public userSrv: UserService,
    public activatedRoute: ActivatedRoute,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.users = this.activatedRoute.snapshot.data.users;
    if (this.users.length) {
      this.temp = [...this.users];
    }
  }


  updateFilter(event: any) {
    const val = event.target.value.toLowerCase();

    const temp = this.temp.filter(function (d) {
      const isFounded = d.prenom.toLowerCase().indexOf(val) !== -1
        || d.nom.toLowerCase().indexOf(val) !== -1
        || d.username.toLowerCase().indexOf(val) !== -1
        || d.telephone.toLowerCase().indexOf(val) !== -1
        || d.adresse.toLowerCase().indexOf(val) !== -1

      return isFounded;
    });

    this.users = temp;
    if (this.table) {
      this.table.offset = 0;
    }
  }


  refresh() {
    this.spinner.show();
    this
      .userSrv
      .findAll()
      .pipe(
        first(),
        finalize(() => this.spinner.hide())
      ).subscribe((users: ApplicationUser[]) => {
        this.users = users;
        this.users = [...this.users];
      }, err => {
        this.userSrv.httpSrv.handleError(err);
      })
  }

  displayViewModal(user: ApplicationUser) {
    this.selectedUser = user;
    this.isViewModalVisible = true;
  }

  displayEditModal(user: ApplicationUser) {
    this.selectedUser = user;
    this.isEditModalVisible = true;
  }

  onCreated(user: ApplicationUser) {
    this.users.push(user);
    this.users = [...this.users];
  }

  onUpdated(user: ApplicationUser) {
    this.isEditModalVisible = false;
    this.refresh();
  }

  /* delete(user: ApplicationUser) {
     this
       .userSrv
       .destroy(user)
       .subscribe((message: any) => {
         this.users = this.users.filter(u => u.id !== user.id);
         this.users = [...this.users];
         this.userSrv.httpSrv.notificationService.displaySuccess('Suppression reussi.')
       }, err => {
         this.userSrv.httpSrv.handleError(err);
       });
   }*/

  delete(user: ApplicationUser) {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Voulez vous procéder à la suppression ?',
      nzContent: 'Attention cette opération est irreversible',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          this
            .userSrv
            .destroy(user)
            .subscribe((message: any) => {
              resolve(message);
            }, err => {
              reject(err);
            });
        })
          .then((message) => {
            this.users = this.users.filter(u => u.id !== user.id);
            this.users = [...this.users];
            this.userSrv.httpSrv.notificationService.displaySuccess('Suppression reussi.')
          })
          .catch((err) => {
            this.userSrv.httpSrv.handleError(err);
          })
    });
  }

}
