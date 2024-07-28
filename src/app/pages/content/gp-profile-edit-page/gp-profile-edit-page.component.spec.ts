import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpProfileEditPageComponent } from './gp-profile-edit-page.component';

describe('GpProfileEditPageComponent', () => {
  let component: GpProfileEditPageComponent;
  let fixture: ComponentFixture<GpProfileEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpProfileEditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpProfileEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
