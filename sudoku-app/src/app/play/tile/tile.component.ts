import { Component, Input, OnInit } from '@angular/core';
import { DefaultTileBorders, TileBorders } from './tile.model';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent implements OnInit {
  @Input() borders: TileBorders = DefaultTileBorders;

  value?: number;
  numbersPattern = '/[1-9]/';

  constructor() { }

  ngOnInit() { }
}
