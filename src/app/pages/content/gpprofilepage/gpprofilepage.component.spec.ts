import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpprofilepageComponent } from './gpprofilepage.component';

describe('GpprofilepageComponent', () => {
  let component: GpprofilepageComponent;
  let fixture: ComponentFixture<GpprofilepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpprofilepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpprofilepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
