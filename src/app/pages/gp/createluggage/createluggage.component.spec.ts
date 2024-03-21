import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateluggageComponent } from './createluggage.component';

describe('CreateluggageComponent', () => {
  let component: CreateluggageComponent;
  let fixture: ComponentFixture<CreateluggageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateluggageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateluggageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
