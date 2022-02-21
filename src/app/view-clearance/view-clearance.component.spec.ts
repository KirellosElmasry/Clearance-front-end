import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClearanceComponent } from './view-clearance.component';

describe('ViewClearanceComponent', () => {
  let component: ViewClearanceComponent;
  let fixture: ComponentFixture<ViewClearanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewClearanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
