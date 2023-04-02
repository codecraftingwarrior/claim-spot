import { Component, Input, OnInit } from '@angular/core';
import { Option } from '../option';

@Component({
  selector: 'app-option-detail',
  templateUrl: './option-detail.component.html',
  styleUrls: ['./option-detail.component.scss']
})
export class OptionDetailComponent implements OnInit {

  @Input() option: Option;
  constructor() { }

  ngOnInit(): void {
  }

}
