import { Component, Input, OnInit } from '@angular/core';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as frenchStrings } from 'ngx-timeago/language-strings/fr';
import { Annonce } from 'src/app/core/annonce/annonce';

@Component({
  selector: 'app-annonce-item',
  templateUrl: './annonce-item.component.html',
  styleUrls: ['./annonce-item.component.scss']
})
export class AnnonceItemComponent implements OnInit {

  //lang = 'fr';
  @Input() annonce: Annonce;
  shareButtonsVisible = false;

  constructor(
    private intl: TimeagoIntl
  ) {
    //this.lang = 'fr';
    this.intl.strings = frenchStrings
    this.intl.changes.next();
   }

  ngOnInit(): void {
  }

}
