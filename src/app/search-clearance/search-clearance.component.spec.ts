import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchClearanceComponent } from './search-clearance.component';

describe('SearchClearanceComponent', () => {
  let component: SearchClearanceComponent;
  let fixture: ComponentFixture<SearchClearanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchClearanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchClearanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
