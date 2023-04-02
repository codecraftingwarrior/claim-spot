import { Component, Input, OnInit } from '@angular/core';
import { Formule } from '../formule.model';

@Component({
  selector: 'app-formule-detail',
  templateUrl: './formule-detail.component.html',
  styleUrls: ['./formule-detail.component.scss']
})
export class FormuleDetailComponent implements OnInit {

  @Input() formule: Formule;
  constructor() { }

  ngOnInit(): void {
  }

}
