import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkreturnsComponent } from './workreturns.component';

describe('WorkreturnsComponent', () => {
  let component: WorkreturnsComponent;
  let fixture: ComponentFixture<WorkreturnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkreturnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkreturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
