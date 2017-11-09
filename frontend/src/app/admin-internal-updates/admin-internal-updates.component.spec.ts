import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInternalUpdatesComponent } from './admin-internal-updates.component';

describe('AdminInternalUpdatesComponent', () => {
  let component: AdminInternalUpdatesComponent;
  let fixture: ComponentFixture<AdminInternalUpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInternalUpdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInternalUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
