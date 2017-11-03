import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStateComponent } from './admin-state.component';

describe('AdminStateComponent', () => {
  let component: AdminStateComponent;
  let fixture: ComponentFixture<AdminStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
