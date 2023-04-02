import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-indicator',
  templateUrl: './empty-indicator.component.html',
  styleUrls: ['./empty-indicator.component.scss']
})
export class EmptyIndicatorComponent implements OnInit {

  @Input() isGrantedCreate = true;
  @Input() displayButton = true;
  @Output() buttonClicked: EventEmitter<Boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
