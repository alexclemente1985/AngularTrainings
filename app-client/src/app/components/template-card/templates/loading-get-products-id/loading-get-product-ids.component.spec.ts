import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingGetProductIDsComponent } from './loading-get-product-ids.component';

describe('LoadingGetProductIDsComponent', () => {
  let component: LoadingGetProductIDsComponent;
  let fixture: ComponentFixture<LoadingGetProductIDsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingGetProductIDsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingGetProductIDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
