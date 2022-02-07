import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpDeleteComponent } from './http-delete.component';

describe('HttpDeleteComponent', () => {
  let component: HttpDeleteComponent;
  let fixture: ComponentFixture<HttpDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
