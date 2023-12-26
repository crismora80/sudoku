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
  @ViewChild('input', { static: true }) ionInputEl!: IonInput;

  numbersPattern = /[^1-9]/;
  isInputFocused = false;

  constructor() { }

  ngOnInit() { }

  onInput(event: any) {
    const value = event.target!.value as string;
    const filteredValue = value.replace(this.numbersPattern, '').slice(0, 1);
    this.ionInputEl.value = this.tileValue!.value = filteredValue;
  }

  toggleFocused(): void {
    this.isInputFocused = !this.isInputFocused;
  }
}
