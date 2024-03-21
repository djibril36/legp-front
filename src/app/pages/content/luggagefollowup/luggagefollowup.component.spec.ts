import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuggagefollowupComponent } from './luggagefollowup.component';

describe('LuggagefollowupComponent', () => {
  let component: LuggagefollowupComponent;
  let fixture: ComponentFixture<LuggagefollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuggagefollowupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuggagefollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
