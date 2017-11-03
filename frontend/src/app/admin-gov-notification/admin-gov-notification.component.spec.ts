import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGovNotificationComponent } from './admin-gov-notification.component';

describe('AdminGovNotificationComponent', () => {
  let component: AdminGovNotificationComponent;
  let fixture: ComponentFixture<AdminGovNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGovNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGovNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
