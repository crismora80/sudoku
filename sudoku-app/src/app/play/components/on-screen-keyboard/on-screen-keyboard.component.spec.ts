import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnScreenKeyboardComponent } from './on-screen-keyboard.component';

describe('OnScreenKeyboardComponent', () => {
  let component: OnScreenKeyboardComponent;
  let fixture: ComponentFixture<OnScreenKeyboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OnScreenKeyboardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnScreenKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
