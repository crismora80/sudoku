import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-on-screen-keyboard',
  templateUrl: './on-screen-keyboard.component.html',
  styleUrls: ['./on-screen-keyboard.component.scss'],
})
export class OnScreenKeyboardComponent implements OnInit {
  firstDigits = ["1", "2", "3", "4", "5"]
  lastDigits = ["6", "7", "8", "9"]

  @Output() keyPressed = new EventEmitter<string>();
  @Output() clearPressed = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }

  onKeyPressed(digit: string): void {
    this.keyPressed.emit(digit);
  }

  onClearPressed(digit: string): void {
    this.clearPressed.emit();
  }

}
