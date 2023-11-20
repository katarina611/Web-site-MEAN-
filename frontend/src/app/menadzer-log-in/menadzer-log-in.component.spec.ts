import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenadzerLogInComponent } from './menadzer-log-in.component';

describe('MenadzerLogInComponent', () => {
  let component: MenadzerLogInComponent;
  let fixture: ComponentFixture<MenadzerLogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenadzerLogInComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenadzerLogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
