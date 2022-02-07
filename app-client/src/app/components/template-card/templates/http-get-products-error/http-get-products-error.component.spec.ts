import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpGetProductsErrorComponent } from './http-get-products-error.component';

describe('HttpGetProductsErrorComponent', () => {
  let component: HttpGetProductsErrorComponent;
  let fixture: ComponentFixture<HttpGetProductsErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HttpGetProductsErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpGetProductsErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
