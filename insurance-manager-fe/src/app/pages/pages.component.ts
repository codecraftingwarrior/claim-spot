import { Component, OnInit } from '@angular/core';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as frenchStrings } from 'ngx-timeago/language-strings/fr';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  lang = frenchStrings;
  constructor(
    public intl: TimeagoIntl
  ) { 
    intl.strings  = frenchStrings;
    intl.changes.next();
  }

  ngOnInit(): void {
  }

}
