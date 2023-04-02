import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-field-validation-state',
  templateUrl: './field-validation-state.component.html',
  styleUrls: ['./field-validation-state.component.scss']
})
export class FieldValidationStateComponent implements OnInit {

  field: NgModel;
  constructor() { }

  ngOnInit(): void {
  }

  @Input() set formField(val) {
    this.field = val;
  }

  get formField() {
    return this.field;
  }

}
