import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsearchpageComponent } from './gpsearchpage.component';

describe('GpsearchpageComponent', () => {
  let component: GpsearchpageComponent;
  let fixture: ComponentFixture<GpsearchpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsearchpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsearchpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
