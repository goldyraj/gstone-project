import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHsnCodeComponent } from './user-hsn-code.component';

describe('UserHsnCodeComponent', () => {
  let component: UserHsnCodeComponent;
  let fixture: ComponentFixture<UserHsnCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHsnCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHsnCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
