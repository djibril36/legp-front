import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelsofweekComponent } from './travelsofweek.component';

describe('TravelsofweekComponent', () => {
  let component: TravelsofweekComponent;
  let fixture: ComponentFixture<TravelsofweekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelsofweekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelsofweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
