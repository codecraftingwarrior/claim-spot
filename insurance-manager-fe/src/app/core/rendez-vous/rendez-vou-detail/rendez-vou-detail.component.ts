import { Component, Input, OnInit } from '@angular/core';
import { RendezVous } from '../rendez-vou';

@Component({
  selector: 'app-rendez-vou-detail',
  templateUrl: './rendez-vou-detail.component.html',
  styleUrls: ['./rendez-vou-detail.component.scss']
})
export class RendezVousDetailComponent implements OnInit {

  @Input() rendezVou: RendezVous;
  constructor() { }

  ngOnInit(): void {
  }

}
