import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsColdObservablesComponent } from './rxjs-cold-observables.component';

describe('RxjsColdObservablesComponent', () => {
  let component: RxjsColdObservablesComponent;
  let fixture: ComponentFixture<RxjsColdObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsColdObservablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsColdObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
