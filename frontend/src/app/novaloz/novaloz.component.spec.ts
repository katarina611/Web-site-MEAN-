import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovalozComponent } from './novaloz.component';

describe('NovalozComponent', () => {
  let component: NovalozComponent;
  let fixture: ComponentFixture<NovalozComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovalozComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovalozComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
