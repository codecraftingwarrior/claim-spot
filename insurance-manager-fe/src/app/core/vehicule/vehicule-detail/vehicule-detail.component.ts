import { Component, Input, OnInit } from '@angular/core';
import { Vehicule } from '../vehicule';

@Component({
  selector: 'app-vehicule-detail',
  templateUrl: './vehicule-detail.component.html',
  styleUrls: ['./vehicule-detail.component.scss']
})
export class VehiculeDetailComponent implements OnInit {

  @Input() vehicule: Vehicule;
  constructor() { }

  ngOnInit(): void {
  }

}
