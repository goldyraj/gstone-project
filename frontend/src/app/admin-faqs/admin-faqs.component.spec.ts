import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFaqsComponent } from './admin-faqs.component';

describe('AdminFaqsComponent', () => {
  let component: AdminFaqsComponent;
  let fixture: ComponentFixture<AdminFaqsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFaqsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
