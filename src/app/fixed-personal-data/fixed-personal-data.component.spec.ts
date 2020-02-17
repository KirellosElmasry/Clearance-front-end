import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedPersonalDataComponent } from './fixed-personal-data.component';

describe('FixedPersonalDataComponent', () => {
  let component: FixedPersonalDataComponent;
  let fixture: ComponentFixture<FixedPersonalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedPersonalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
