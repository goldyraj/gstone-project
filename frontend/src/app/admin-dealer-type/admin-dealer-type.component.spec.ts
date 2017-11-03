import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDealerTypeComponent } from './admin-dealer-type.component';

describe('AdminDealerTypeComponent', () => {
  let component: AdminDealerTypeComponent;
  let fixture: ComponentFixture<AdminDealerTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDealerTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDealerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
