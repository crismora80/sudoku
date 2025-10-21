import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { TileValue } from '../table/table.model';
import { DefaultTileBorders, TileBorders } from './tile.model';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  @Input() borders: TileBorders = DefaultTileBorders;
  @Input() tileValue?: TileValue;
  @Input() focused = false;

  @ViewChild('singleDigitInput', { static: true }) ionInputEl!: IonInput;

  constructor() { }

  ngOnInit() { }

  multiValueEntered(event: KeyboardEvent): void {
    const value = event.key;

  }
}
