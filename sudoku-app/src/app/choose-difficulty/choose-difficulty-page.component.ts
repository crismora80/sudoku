import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { DifficultyLevel } from '../play/table/table.model';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-choose-difficulty-page',
  templateUrl: './choose-difficulty-page.component.html',
  standalone: true,
  imports: [IonicModule, SharedModule],
  styleUrls: ['./choose-difficulty-page.component.scss'],
})
export class ChooseDifficultyPageComponent {
  DifficultyLevel = DifficultyLevel;

  constructor(private router: Router) { }

  navigateToPlayPage(difficulty: DifficultyLevel): void {
    this.router.navigateByUrl(`/play?difficulty=${difficulty}`);
  }
}
