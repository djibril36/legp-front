import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateluggageComponent } from './updateluggage.component';

describe('UpdateluggageComponent', () => {
  let component: UpdateluggageComponent;
  let fixture: ComponentFixture<UpdateluggageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateluggageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateluggageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
