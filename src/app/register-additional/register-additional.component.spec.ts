import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdditionalComponent } from './register-additional.component';

describe('RegisterAdditionalComponent', () => {
  let component: RegisterAdditionalComponent;
  let fixture: ComponentFixture<RegisterAdditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAdditionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAdditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
