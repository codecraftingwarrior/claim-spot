import { Component, Input, OnInit } from '@angular/core';
import { Accident } from '../accident';

@Component({
  selector: 'app-accident-detail',
  templateUrl: './accident-detail.component.html',
  styleUrls: ['./accident-detail.component.scss']
})
export class AccidentDetailComponent implements OnInit {

  @Input() accident: Accident;
  constructor() { }

  ngOnInit(): void {
  }

}
