import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAboutUsComponent } from './user-about-us.component';

describe('UserAboutUsComponent', () => {
  let component: UserAboutUsComponent;
  let fixture: ComponentFixture<UserAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
