import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnClientsComponent } from './own-clients.component';

describe('OwnClientsComponent', () => {
  let component: OwnClientsComponent;
  let fixture: ComponentFixture<OwnClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnClientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
