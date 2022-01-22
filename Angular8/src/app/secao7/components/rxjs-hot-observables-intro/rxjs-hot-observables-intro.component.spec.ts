import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsHotObservablesIntroComponent } from './rxjs-hot-observables-intro.component';

describe('RxjsHotObservablesIntroComponent', () => {
  let component: RxjsHotObservablesIntroComponent;
  let fixture: ComponentFixture<RxjsHotObservablesIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsHotObservablesIntroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsHotObservablesIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
