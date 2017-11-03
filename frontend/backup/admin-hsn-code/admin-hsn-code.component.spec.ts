import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHsnCodeComponent } from './admin-hsn-code.component';

describe('AdminHsnCodeComponent', () => {
  let component: AdminHsnCodeComponent;
  let fixture: ComponentFixture<AdminHsnCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHsnCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHsnCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
