import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StranicaLekaraComponent } from './stranica-lekara.component';

describe('StranicaLekaraComponent', () => {
  let component: StranicaLekaraComponent;
  let fixture: ComponentFixture<StranicaLekaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StranicaLekaraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StranicaLekaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
