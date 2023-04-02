import { Component, Input, OnInit } from '@angular/core';
import { Etat } from '../etat';

@Component({
  selector: 'app-etat-detail',
  templateUrl: './etat-detail.component.html',
  styleUrls: ['./etat-detail.component.scss']
})
export class EtatDetailComponent implements OnInit {

  @Input() etat: Etat;
  constructor() { }

  ngOnInit(): void {
  }

}
