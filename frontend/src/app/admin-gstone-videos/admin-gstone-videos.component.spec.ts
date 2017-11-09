import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGstoneVideosComponent } from './admin-gstone-videos.component';

describe('AdminGstoneVideosComponent', () => {
  let component: AdminGstoneVideosComponent;
  let fixture: ComponentFixture<AdminGstoneVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGstoneVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGstoneVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
