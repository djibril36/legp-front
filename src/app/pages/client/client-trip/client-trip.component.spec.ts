import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTripComponent } from './client-trip.component';

describe('ClientTripComponent', () => {
  let component: ClientTripComponent;
  let fixture: ComponentFixture<ClientTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
