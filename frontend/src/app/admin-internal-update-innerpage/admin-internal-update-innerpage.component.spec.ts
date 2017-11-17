import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInternalUpdateInnerpageComponent } from './admin-internal-update-innerpage.component';

describe('AdminInternalUpdateInnerpageComponent', () => {
  let component: AdminInternalUpdateInnerpageComponent;
  let fixture: ComponentFixture<AdminInternalUpdateInnerpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInternalUpdateInnerpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInternalUpdateInnerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
