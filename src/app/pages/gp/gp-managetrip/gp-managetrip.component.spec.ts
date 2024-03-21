import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpManagetripComponent } from './gp-managetrip.component';

describe('GpManagetripComponent', () => {
  let component: GpManagetripComponent;
  let fixture: ComponentFixture<GpManagetripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpManagetripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpManagetripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
