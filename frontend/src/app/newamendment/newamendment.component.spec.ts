import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewamendmentComponent } from './newamendment.component';

describe('NewamendmentComponent', () => {
  let component: NewamendmentComponent;
  let fixture: ComponentFixture<NewamendmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewamendmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewamendmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
