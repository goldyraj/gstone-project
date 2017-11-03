import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbosComponent } from './addbos.component';

describe('AddbosComponent', () => {
  let component: AddbosComponent;
  let fixture: ComponentFixture<AddbosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddbosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
