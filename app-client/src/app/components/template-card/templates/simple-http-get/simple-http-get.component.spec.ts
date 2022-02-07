import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleHttpGetComponent } from './simple-http-get.component';

describe('SimpleHttpGetComponent', () => {
  let component: SimpleHttpGetComponent;
  let fixture: ComponentFixture<SimpleHttpGetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleHttpGetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleHttpGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
