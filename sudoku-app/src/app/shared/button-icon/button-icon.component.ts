import { Component, Input, OnInit } from '@angular/core';
import { ButtonIcon } from './button-icon.module';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.scss'],
})
export class ButtonIconComponent implements OnInit {
  @Input() icon?: ButtonIcon;

  constructor() { }

  ngOnInit() { }

}
