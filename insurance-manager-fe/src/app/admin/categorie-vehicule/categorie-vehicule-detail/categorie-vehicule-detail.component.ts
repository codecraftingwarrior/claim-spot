import { Component, Input, OnInit } from '@angular/core';
import { CategorieVehicule } from '../categorie-vehicule';

@Component({
  selector: 'app-categorie-vehicule-detail',
  templateUrl: './categorie-vehicule-detail.component.html',
  styleUrls: ['./categorie-vehicule-detail.component.scss']
})
export class CategorieVehiculeDetailComponent implements OnInit {

  @Input() categorieVehicule: CategorieVehicule;
  constructor() { }

  ngOnInit(): void {
  }

}
