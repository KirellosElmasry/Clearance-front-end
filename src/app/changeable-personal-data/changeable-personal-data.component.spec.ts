import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeablePersonalDataComponent } from './changeable-personal-data.component';

describe('ChangeablePersonalDataComponent', () => {
  let component: ChangeablePersonalDataComponent;
  let fixture: ComponentFixture<ChangeablePersonalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeablePersonalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeablePersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
