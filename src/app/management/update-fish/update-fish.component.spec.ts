import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFishComponent } from './update-fish.component';

describe('UpdateFishComponent', () => {
  let component: UpdateFishComponent;
  let fixture: ComponentFixture<UpdateFishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateFishComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateFishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
