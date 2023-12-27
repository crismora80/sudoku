import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-text',
  templateUrl: './button-text.component.html',
  styleUrls: ['./button-text.component.scss'],
})
export class ButtonTextComponent implements OnInit {
  @Input() text?: string;

  constructor() { }

  ngOnInit() { }

}
