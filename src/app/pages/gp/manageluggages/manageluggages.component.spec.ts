import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageluggagesComponent } from './manageluggages.component';

describe('ManageluggagesComponent', () => {
  let component: ManageluggagesComponent;
  let fixture: ComponentFixture<ManageluggagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageluggagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageluggagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
