import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerTypeComponent } from './dealerType.component';

describe('UserComponent', () => {
  let component: DealerTypeComponent;
  let fixture: ComponentFixture<DealerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
