import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingGetProductsComponent } from './loading-get-products.component';

describe('LoadingGetProductsComponent', () => {
  let component: LoadingGetProductsComponent;
  let fixture: ComponentFixture<LoadingGetProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingGetProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingGetProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
