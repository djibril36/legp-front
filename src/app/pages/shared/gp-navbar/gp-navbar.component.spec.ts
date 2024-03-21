import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpNavbarComponent } from './gp-navbar.component';

describe('GpNavbarComponent', () => {
  let component: GpNavbarComponent;
  let fixture: ComponentFixture<GpNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
