import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpEditComponent } from './http-edit.component';

describe('HttpEditComponent', () => {
  let component: HttpEditComponent;
  let fixture: ComponentFixture<HttpEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
