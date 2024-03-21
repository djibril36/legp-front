import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpFooterComponent } from './gp-footer.component';

describe('GpFooterComponent', () => {
  let component: GpFooterComponent;
  let fixture: ComponentFixture<GpFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
