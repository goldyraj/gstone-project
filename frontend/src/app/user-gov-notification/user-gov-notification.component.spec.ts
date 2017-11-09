import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGovNotificationComponent } from './user-gov-notification.component';

describe('UserGovNotificationComponent', () => {
  let component: UserGovNotificationComponent;
  let fixture: ComponentFixture<UserGovNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGovNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGovNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
