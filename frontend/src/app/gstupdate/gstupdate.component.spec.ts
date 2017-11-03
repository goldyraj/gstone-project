import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstupdateComponent } from './gstupdate.component';

describe('GstupdateComponent', () => {
  let component: GstupdateComponent;
  let fixture: ComponentFixture<GstupdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstupdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
