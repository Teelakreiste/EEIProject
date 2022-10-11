import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInfoProductComponent } from './view-info-product.component';

describe('ViewInfoProductComponent', () => {
  let component: ViewInfoProductComponent;
  let fixture: ComponentFixture<ViewInfoProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInfoProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInfoProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
