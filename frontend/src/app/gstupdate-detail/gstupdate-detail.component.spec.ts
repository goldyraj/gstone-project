import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstupdateDetailComponent } from './gstupdate-detail.component';

describe('GstupdateDetailComponent', () => {
  let component: GstupdateDetailComponent;
  let fixture: ComponentFixture<GstupdateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstupdateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstupdateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
