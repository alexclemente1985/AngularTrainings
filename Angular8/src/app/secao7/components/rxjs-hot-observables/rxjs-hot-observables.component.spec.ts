import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsHotObservablesComponent } from './rxjs-hot-observables.component';

describe('RxjsHotObservablesComponent', () => {
  let component: RxjsHotObservablesComponent;
  let fixture: ComponentFixture<RxjsHotObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsHotObservablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsHotObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
