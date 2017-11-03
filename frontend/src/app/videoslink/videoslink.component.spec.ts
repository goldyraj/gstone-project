import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoslinkComponent } from './videoslink.component';

describe('VideoslinkComponent', () => {
  let component: VideoslinkComponent;
  let fixture: ComponentFixture<VideoslinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoslinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoslinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
