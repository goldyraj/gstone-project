import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAboutUsComponent } from './admin-about-us.component';

describe('AdminAboutUsComponent', () => {
  let component: AdminAboutUsComponent;
  let fixture: ComponentFixture<AdminAboutUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
